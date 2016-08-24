import React from 'react';
import GifStore from '../stores/GifStore';
import * as GifActions from '../actions/GifActions';
import * as Clipboard from '../utils/Clipboard';
import GifsView from '../components/gif/GifsView';
import GifFilter from '../components/gif/GifFilter';
import BackToTop from '../components/common/BackToTop';
import GifAddModal from '../components/common/GifAddModal';

const OFFSET = 30;

class Gif extends React.Component {
    constructor(props) {
        super(props);

        let gifs = GifStore.getAll();

        this.state = {
            _gifs: gifs,
            total_count: gifs.length,
            gifs: gifs.slice(0, OFFSET),
            offset: OFFSET
        };

        this.onStoreChange = this.onStoreChange.bind(this);
        this.loadMoreGifs = this.loadMoreGifs.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }
    componentDidMount() {
        GifStore.addChangeListener(this.onStoreChange);
    }
    componentWillUnmount() {
        GifStore.removeChangeListener(this.onStoreChange);
    }
    onStoreChange() {
        let gifs = GifStore.getAll();

        this.setState({
            _gifs: gifs,
            total_count: gifs.length,
            gifs: gifs.slice(0, OFFSET),
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
    handleAdd() {
        GifAddModal.show();
    }
    handleFilter(e) {
        GifActions.filter(e.target.value);
    }
    handleSelect(gif) {
        GifActions.filter(gif.name);
        this.handleCopy(gif);
    }
    handleCopy(gif) {
        Clipboard.copy(gif.url);
        toastr.success(gif.name + ' copied to clipboard!'); //eslint-disable-line no-undef
        GifActions.priority(gif.id);
    }
    handleDelete(gif) {
        GifActions.remove(gif.id);
    }
    handleUpload(gif) {
        GifActions.upload(gif.id);
    }
    handleEdit(gif, name) {
        GifActions.update(gif.id, name);
    }
    handleDownload(gif) {
        GifActions.priority(gif.id, 5);
    }
    render() {
        return (
            <div id="Gif" className="col-xs-12">
                <div className="row">
                    <GifFilter
                        gifs={this.state._gifs}
                        filter={this.handleFilter}
                        select={this.handleSelect}
                        add={this.handleAdd} />
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
                <GifAddModal />
            </div>
        );
    }
};

export default Gif;