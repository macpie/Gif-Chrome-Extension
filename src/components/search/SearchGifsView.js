import React, {
    PropTypes
} from 'react';
import Infinite from 'react-infinite';
import GifAddModal from '../common/GifAddModal';
import SearchGifsRows from './SearchGifsRows';
import '../../css/SearchGifsView.css'

class SearchGifsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selected_url: ''
        };
    }
    handleClick(gif) {
        this.setState({
            selected_url: gif.images.downsized_medium.url
        });

        GifAddModal.show();
    }
    hide() {
        let style = {};

        if (this.props.children.length === 0 &&
            !this.props.query) {
            style.display = 'none';
        }

        return style;
    }
    render() {
        let width = $(window).width(),
            height = 150,
            children;

        if (width < 800) {
            height = 150;
        } else if (width < 1000) {
            height = 180;
        } else if (width < 1000) {
            height = 200;
        } else {
            height = 290;
        }

        if (this.props.children.length) {
            children = this.props.children.map((child, i) => {
                return (<SearchGifsRows key={i} click={this.handleClick}>{child}</SearchGifsRows>);
            });
        } else {
            children = [];
        }

        return (
            <div id="SearchGifsView" className="col-xs-12">
                <div className="row" style={this.hide.bind(this)()}>
                    <div className="page-header">
                        <h1>Search for "{this.props.query}"
                            <small>{this.props.pagination.total_count} result(s)</small>
                        </h1>
                    </div>
                </div>
                <Infinite
                    id="GifsView"
                    className="col-xs-12"
                    useWindowAsScrollContainer={true}
                    elementHeight={height}
                    infiniteLoadBeginEdgeOffset={height*3}
                    onInfiniteLoad={this.props.loadMore}>
                    {children}
                </Infinite>
                <GifAddModal url={this.state.selected_url}/>
            </div>
        );
    }
};

SearchGifsView.propTypes = {
    query: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
};

export default SearchGifsView;