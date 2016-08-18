import React from 'react';
import GifView from './GifView';

class GifsRow extends React.Component {
    render() {
        let children = this.props.children.map((obj, i) => {
            return (<GifView key={i} gif={obj} />);
        });

        return (
            <div className="row">
                {children}
            </div>
        );
    }
};

export default GifsRow;