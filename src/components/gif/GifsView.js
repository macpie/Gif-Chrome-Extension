import React, {
    PropTypes
} from 'react';
import Infinite from 'react-infinite';
import GifsRow from './GifsRow';

class GifsView extends React.Component {
    render() {
        let width = $(window).width(),
            height = 150,
            children = [];

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
                let key = '';

                child.forEach((o) => {
                    key += o.id.substring(0, 5)
                });

                return (<GifsRow key={key}>{child}</GifsRow>);
            });
        }

        return (
            <Infinite
                className="col-xs-12 gifs-view"
                useWindowAsScrollContainer={false}
                containerHeight={440}
                elementHeight={height}
                infiniteLoadBeginEdgeOffset={height*3}
                onInfiniteLoad={this.props.loadMoreGifs}>
                {children}
            </Infinite>
        );
    }
};

GifsView.propTypes = {
    loadMoreGifs: PropTypes.func.isRequired
};

export default GifsView;