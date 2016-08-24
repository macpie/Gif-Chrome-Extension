import React, {
    PropTypes
} from 'react';
import GifView from './GifView';

class GifsRow extends React.Component {
    render() {
        let children = this.props.gifs.map((gif, i) => {
            return (
                <GifView
                    key={gif.id}
                    gif={gif}
                    copy={this.props.copy}
                    delete={this.props.delete}
                    upload={this.props.upload}
                    edit={this.props.edit}
                    download={this.props.download}
                />
            );
        });

        return (
            <div className="row">
                {children}
            </div>
        );
    }
};

GifsRow.propTypes = {
    gifs: PropTypes.array.isRequired,
    copy: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
};

export default GifsRow;