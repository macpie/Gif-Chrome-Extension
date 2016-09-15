import React, {
    PropTypes
} from 'react';
import {
    GridTile
} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';

class GifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = Object.assign({}, props.gif, {
            img_url: props.gif.still_url || props.gif.url
        });
    }
    componentWillReceiveProps(nextProps) {
        let nextGif = nextProps.gif,
            newState = Object.assign({}, nextGif, {
                img_url: nextGif.still_url || nextGif.url
            });

        this.setState(newState);
    }
    handleMouseOver() {
        let gif = this.state;

        this.setState({
            img_url: gif.url
        });
    }
    handleMouseOut() {
        let gif = this.state;

        this.setState({
            img_url: gif.still_url || gif.url
        });
    }
    render() {
        let gif = this.state;

        return (
            <GridTile
                title={
                    <FlatButton
                        style={{
                            width: "100%"
                        }}
                        label={gif.name}
                        labelStyle={{
                            color: "white",
                            textTransform: "none",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "block"
                        }}
                        onClick={() => {this.props.onSelect(gif)}}
                    />
                }
                titlePosition="top"
                actionIcon={
                    <IconButton onClick={() => {this.props.onCopy(gif)}}>
                        <CopyIcon color="white" />
                    </IconButton>
                }
                style={{
                    cursor: "pointer"
                }}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <img src={gif.img_url} role="presentation" />
            </GridTile>
        );
    }
};

GifView.propTypes = {
    gif: PropTypes.object.isRequired,
    onCopy: PropTypes.func.isRequired,
    onSelect: PropTypes.func
};

export default GifView;