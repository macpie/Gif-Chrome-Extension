import React from 'react';
import * as _ from 'lodash';
import * as Clipboard from '../../utils/Clipboard';
import GifsView from './GifsView';
import GifFilter from './GifFilter';
import BackToTop from '../common/BackToTop';
import GifAddModal from '../common/GifAddModal';

const OFFSET = 30;

const orderBy = (arr) => {
    return _.orderBy(arr, ['priority', 'name'], ['desc', 'asc']);
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
            offset: OFFSET
        };

        this.loadMoreGifs = this.loadMoreGifs.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
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
    showModal() {
        GifAddModal.show();
    }
    handleFilter(str) {
        this.props.actions.filter(str);
    }
    handleSelect(gif) {
        this.props.actions.filter(gif.name);
        this.handleCopy(gif);
    }
    handleCopy(gif) {
        Clipboard.copy(gif.url);
        toastr.success(gif.name + ' copied to clipboard!');
        this.props.actions.priority(gif, 1);
    }
    handleDelete(gif) {
        this.props.actions.remove(gif.id);
    }
    handleUpload(gif) {
        this.props.actions.upload(gif);
    }
    handleEdit(gif, name) {
        gif.name = name;
        this.props.actions.update(gif);
    }
    handleDownload(gif) {
        this.props.actions.priority(gif, 3);
    }
    handleAdd(name, url, still_url) {
        this.props.actions.create(name, url, still_url);
        GifAddModal.hide();
    }
    render() {
        return (
            <div id="Gif" className="col-xs-12">
                <div className="row">
                    <GifFilter
                        gifs={_.toArray(this.state._gifs)}
                        filter={this.props.filter}
                        onFilter={this.handleFilter}
                        onSelect={this.handleSelect}
                        onAdd={this.showModal} />
                </div>
                <div className="row">
                    <GifsView
                        gifs={this.state.gifs}
                        loadMoreGifs={this.loadMoreGifs}
                        copy={this.handleCopy}
                        delete={this.handleDelete}
                        upload={this.handleUpload}
                        edit={this.handleEdit}
                        download={this.handleDownload} />
                </div>
                <BackToTop />
                <GifAddModal onSuccess={this.handleAdd} />
            </div>
        );
    }
};

export default Gif;