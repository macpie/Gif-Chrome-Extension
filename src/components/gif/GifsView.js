import React, {
    PropTypes
} from 'react';
import Infinite from 'react-infinite';
import GifsRow from './GifsRow';

class GifsView extends React.Component {
    render() {
        let children = this.props.children.map((child, i) => {
            return (<GifsRow key={i}>{child}</GifsRow>);
        });

        return (
            <Infinite
                id="GifsView"
                className="col-xs-12"
                useWindowAsScrollContainer={true}
                elementHeight={220}
                infiniteLoadBeginEdgeOffset={600}
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