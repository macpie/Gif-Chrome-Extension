import React, {
    PropTypes
} from 'react';
import GifView from './GifView';

class GifsRow extends React.Component {
    render() {
        let children = this.props.gifs.map((gif, i) => {
            return (<GifView key={gif.id} gif={gif} />);
        });

        return (
            <div className="row">
                {children}
            </div>
        );
    }
};

GifsRow.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifsRow;