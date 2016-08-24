import React, {
    PropTypes
} from 'react';
import GifView from './GifView';

class GifsRow extends React.Component {
    render() {
        let children = this.props.gifs.map((gif, i) => {
            let Gif = <GifView key={gif.id} gif={gif} />;

            return React.cloneElement(Gif, {
                copy: this.props.copy,
                delete: this.props.delete,
                upload: this.props.upload,
                edit: this.props.edit
            });
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