import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import Infinite from 'react-infinite';
import SearchGifsRows from './SearchGifsRows';

class SearchGifsView extends React.Component {
    render() {
        let gifs = _.chunk(this.props.gifs, 3),
            children = [];

        if (gifs.length) {
            children = gifs.map((gifsChunk, i) => {
                return <SearchGifsRows key={i} gifs={gifsChunk} click={this.props.click}/>;
            });
        }

        let width = $(window).width(),
            height = 150

        if (width < 800) {
            height = 150;
        } else if (width < 1000) {
            height = 180;
        } else if (width < 1000) {
            height = 200;
        } else {
            height = 290;
        }

        let style = {};

        if (this.props.gifs.length === 0 &&
            !this.props.query) {
            style.display = 'none';
        }

        return (
            <Infinite
                key={this.props.query}
                className="col-xs-12"
                useWindowAsScrollContainer={true}
                elementHeight={height}
                infiniteLoadBeginEdgeOffset={height*3}
                onInfiniteLoad={this.props.loadMore}>
                {children}
            </Infinite>
        );
    }
};

SearchGifsView.propTypes = {
    gifs: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired
};

export default SearchGifsView;