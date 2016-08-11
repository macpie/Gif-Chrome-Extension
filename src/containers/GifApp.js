import React from 'react';
import GifStore from '../stores/GifStore';
import GifsView from '../components/GifsView';
import GifAdd from '../components/GifAdd';
import GifFilter from '../components/GifFilter';

const getGifsState = () => {
    return GifStore.getAll();
};

class GifApp extends React.Component {
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
            <div>
                <GifAdd />
                <GifFilter />
                <GifsView gifs={this.state.gifs} />
            </div>
        );
    }
};

export default GifApp;