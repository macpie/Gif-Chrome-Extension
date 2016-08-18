import React from 'react';
import * as _ from 'lodash';
import GifStore from '../stores/GifStore';
import GifsView from '../components/gif/GifsView';
import GifFilter from '../components/gif/GifFilter';

const OFFSET = 24;

class Gif extends React.Component {
    static getAll() {
        return GifStore.getAll();
    }
    constructor(props) {
        super(props);

        let gifs = Gif.getAll();

        this.state = {
            _gifs: gifs,
            total_count: gifs.length,
            gifs: gifs.slice(0, OFFSET),
            offset: OFFSET
        };

        this._onChange = this._onChange.bind(this);
        this.loadMoreGifs = this.loadMoreGifs.bind(this);
    }
    componentDidMount() {
        GifStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        GifStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        let gifs = Gif.getAll();

        this.setState({
            _gifs: gifs,
            total_count: gifs.length,
            gifs: gifs.slice(0, OFFSET),
            offset: OFFSET
        });
    }
    loadMoreGifs() {
        if (this.state.offset < this.state.total_count) {
            let state = this.state,
                offset = state.offset + OFFSET;

            this.setState({
                gifs: state._gifs.slice(0, offset),
                offset: offset
            });
        }
    }
    render() {
        let gifs = _.chunk(this.state.gifs, 3);

        return (
            <div id="Gif" className="col-xs-12">
                <div className="row">
                    <GifFilter gifs={this.state._gifs} />
                </div>
                <div className="row">
                    <GifsView loadMoreGifs={this.loadMoreGifs}>
                        {gifs}
                    </GifsView>
                </div>
            </div>
        );
    }
};

export default Gif;