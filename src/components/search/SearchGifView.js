import React, {
    PropTypes
} from 'react';
import '../../css/SearchGifView.css'

class SearchGifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            url: props.gif.images.original_still.url
        };
    }
    handleClick() {
        this.props.click(this.props.gif);
    }
    handleMouseOver() {
        let gif = this.props.gif;

        this.setState({
            url: gif.images.downsized.url
        });
    }
    handleMouseOut() {
        let gif = this.props.gif;

        this.setState({
            url: gif.images.original_still.url
        });
    }
    render() {
        return (
            <div className="col-xs-4 search-gif-view">
                <div className="thumbnail" onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <img role="presentation" src={this.state.url} />
                </div>
            </div>
        );
    }
};

SearchGifView.propTypes = {
    gif: PropTypes.object.isRequired,
    click: PropTypes.func
};

export default SearchGifView;