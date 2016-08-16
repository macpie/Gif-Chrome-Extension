import React, {
    PropTypes
} from 'react';
import '../../css/SearchGifView.css'

class SearchGifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (typeof this.props.click === 'function') {
            this.props.click(this.props.gif);
        }
    }
    render() {
        let gif = this.props.gif;

        return (
            <div className="col-xs-4 search-gif-view">
                <div className="thumbnail">
                    <img src={gif.images.original_still.url} role="presentation"  onClick={this.handleClick} />
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