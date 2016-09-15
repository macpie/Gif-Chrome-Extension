import React, {
    PropTypes
} from 'react';
import {
    GridTile
} from 'material-ui/GridList';

class SearchGifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            url: props.gif.images.downsized_still.url
        };
    }
    handleMouseOver() {
        const gif = this.props.gif;

        this.setState({
            url: gif.images.downsized.url
        });
    }
    handleMouseOut() {
        const gif = this.props.gif;

        this.setState({
            url: gif.images.downsized_still.url
        });
    }
    render() {
        let gif = this.props.gif;

        return (
            <GridTile
                onClick={() => {this.props.onSelect(gif)}}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                style={{
                    cursor: "pointer"
                }}
            >
                <img src={this.state.url} role="presentation" />
            </GridTile>
        );
    }
};

SearchGifView.propTypes = {
    gif: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default SearchGifView;