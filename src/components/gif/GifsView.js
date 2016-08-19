import React, {
    PropTypes
} from 'react';
import Infinite from 'react-infinite';
import GifsRow from './GifsRow';

class GifsView extends React.Component {
    render() {
        let width = $(window).width(),
            key = new Date(),
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

        if(this.props.children.length) {
            children = this.props.children.map((child, i) => {
                return (<GifsRow key={i}>{child}</GifsRow>);
            });
        }

        return (
            <Infinite
                key={key}
                id="GifsView"
                className="col-xs-12"
                useWindowAsScrollContainer={true}
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