import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal';
import SearchGifView from './SearchGifView';
import '../../css/SearchGifsView.css'

class SearchGifsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.state = {
            selected_url: ''
        };
    }
    handleClick(gif) {
        this.setState({
            selected_url: gif.images.downsized_medium.url
        });

        $('#GifAddModal').modal('show');
    }
    handleNext(e) {
        e.preventDefault();

        let pagination = this.props.pagination;

        if (pagination.offset < pagination.total_count) {
            this.props.handleOffSet('next');
        }
    }
    handlePrev(e) {
        e.preventDefault();

        let pagination = this.props.pagination;

        if (pagination.offset >= 9) {
            this.props.handleOffSet('prev');
        }
    }
    isDisabled(type) {
        let classes = '',
            p = this.props.pagination;

        if (type === 'next') {
            classes += 'next ';

            if (p.offset + 12 >= p.total_count) classes += 'disabled';
        } else {
            classes += 'previous ';

            if (p.offset <= 0) classes += 'disabled';
        }

        return classes;
    }
    hide() {
        let style = {};

        if (this.props.gifs.length === 0
            && !this.props.query) {
            style.display = 'none';
        }

        return style;
    }
    render() {
        let gifLis = [],
            gifs = this.props.gifs;

        gifs.forEach((gif) => {
            gifLis.push(
                <SearchGifView key={gif.id} gif={gif} click={this.handleClick} />
            );
        });

        return (
            <div id="SearchGifsView">
                <div className="row" style={this.hide.bind(this)()}>
                    <div className="page-header">
                        <h1>Search for "{this.props.query}"
                            <small> {this.props.pagination.total_count} result(s)</small>
                        </h1>
                    </div>
                </div>
                <div className="row" style={this.hide.bind(this)()}>
                    <nav aria-label="...">
                        <ul className="pager">
                            <li className={this.isDisabled.bind(this)('previous')}>
                                <a href="#" onClick={this.handlePrev}>Previous</a>
                            </li>
                            <li className={this.isDisabled.bind(this)('next')}>
                                <a href="#"  onClick={this.handleNext}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="row">{gifLis}</div>
                <GifAddModal url={this.state.selected_url}/>
            </div>
        );
    }
};

SearchGifsView.propTypes = {
    query: PropTypes.string,
    gifs: PropTypes.array,
    pagination: PropTypes.object
};

export default SearchGifsView;