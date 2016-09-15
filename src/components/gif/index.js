import React from 'react';
import * as _ from 'lodash';
import * as Clipboard from '../../utils/Clipboard';
import GifsView from './GifsView';
import GifFilter from './GifFilter';
import GifEditModal from './GifEditModal';

const OFFSET = 30;

const orderBy = (arr) => {
    return _.orderBy(arr, ['name'], ['asc']);
};

const filter = (arr, text) => {
    if (text !== '') {
        let re = new RegExp(text, 'gi');

        return arr.filter((val) => {
            return val.name.match(re);
        });
    } else {
        return arr;
    }
}

class Gif extends React.Component {
    constructor(props) {
        super(props);

        let gifs = _.toArray(props.gifs),
            filtered = filter(gifs, ''),
            orderedGifs = orderBy(filtered);

        this.state = {
            _gifs: gifs,
            gifs: orderedGifs.slice(0, OFFSET),
            total_count: gifs.length,
            offset: OFFSET,
            openEditModal: false,
            selectedGif: {}
        };

        this.loadMoreGifs = this.loadMoreGifs.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilteSelect = this.handleFilteSelect.bind(this);
        this.handleGifSelect = this.handleGifSelect.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let gifs = _.toArray(nextProps.gifs),
            filtered = filter(gifs, nextProps.filter),
            orderedGifs = orderBy(filtered);

        this.setState({
            _gifs: gifs,
            total_count: gifs.length,
            gifs: orderedGifs.slice(0, OFFSET),
            offset: OFFSET
        });
    }
    loadMoreGifs() {
        if (this.state.offset < this.state.total_count) {
            let offset = this.state.offset + OFFSET;

            this.setState({
                gifs: this.state._gifs.slice(0, offset),
                offset: offset
            });
        }
    }
    handleFilter(str) {
        this.props.actions.filter(str);
    }
    handleFilteSelect(gif) {
        this.props.actions.filter(gif.name);
        this.handleCopy(gif);
    }
    handleGifSelect(gif) {
        this.setState({
            openEditModal: true,
            selectedGif: gif
        });
    }
    handleCopy(gif) {
        Clipboard.copy(gif.url);
        toastr.success(gif.name + ' copied to clipboard!');
    }
    handleEdit(gif) {
        this.props.actions.update(gif);
        this.setState({
            openEditModal: false,
            selectedGif: {}
        });
    }
    handleDelete(gif) {
        this.props.actions.remove(gif.id);
        this.setState({
            openEditModal: false,
            selectedGif: {}
        });
    }
    handleUpload(gif) {
        this.props.actions.upload(gif);
        this.setState({
            openEditModal: false,
            selectedGif: {}
        });
    }
    render() {
        return (
            <div id="Gif" className="col-xs-12">
                <div className="row">
                    <GifFilter
                        gifs={_.toArray(this.state._gifs)}
                        filter={this.props.filter}
                        onFilter={this.handleFilter}
                        onSelect={this.handleFilteSelect} />
                </div>
                <div className="row">
                    <GifsView
                        gifs={this.state.gifs}
                        loadMoreGifs={this.loadMoreGifs}
                        onCopy={this.handleCopy}
                        onSelect={this.handleGifSelect} />
                </div>
                <GifEditModal
                    open={this.state.openEditModal}
                    gif={this.state.selectedGif}
                    onSave={this.handleEdit}
                    onDelete={this.handleDelete}
                    onUpload={this.handleUpload}
                />
            </div>
        );
    }
};

export default Gif;