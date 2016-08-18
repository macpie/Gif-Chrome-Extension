import React from 'react';
import GifStore from '../stores/GifStore';
import GifsView from '../components/gif/GifsView';
import GifFilter from '../components/gif/GifFilter';

const getGifsState = () => {
    return GifStore.getAll();
};

class Gif extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: getGifsState()
        };

        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        GifStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        GifStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState({
            gifs: getGifsState()
        });
    }
    render() {
        return (
            <div id="Gif" className="col-xs-12">
                <div className="row">
                    <GifFilter gifs={this.state.gifs} />
                </div>
                <div className="row">
                    <GifsView gifs={this.state.gifs} />
                </div>
            </div>
        );
    }
};

export default Gif;