import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import {
    GridList
} from 'material-ui/GridList';
import {Col} from 'react-flexbox-grid/lib';
import Subheader from 'material-ui/Subheader';
import SearchGifView from './SearchGifView';
import BackToTop from '../common/BackToTop';

class SearchGifsView extends React.Component {
    componentDidMount() {
        let base = 800,
            factor = 1;

        $(window).on('scroll', () => {
            if ($(window).scrollTop() > base * factor) {
                this.props.loadMore();
                factor++;
            }
        });
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
    render() {
        let gifs = _.uniqBy(this.props.gifs, 'id');

        return (
            <Col id="SearchGifsView" xs={12}>
                <GridList cols={3}>
                    <Subheader style={{
                        textAlign: "center"
                    }}>
                        Found {this.props.pagination.total_count} GIFs
                    </Subheader>
                    {gifs.map((gif) => (
                        <SearchGifView
                            key={gif.id}
                            gif={gif}
                            onSelect={this.props.onSelect}/>
                    ))}
                    <BackToTop />
                </GridList>
            </Col>
        );
    }
};

SearchGifsView.propTypes = {
    gifs: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default SearchGifsView;