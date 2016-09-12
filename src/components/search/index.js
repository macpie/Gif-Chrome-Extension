import React from 'react';
import * as GiphyAPI from '../../apis/GiphyAPI';
import SearchForm from './SearchForm';
import SearchGifsView from './SearchGifsView';
import BackToTop from '../common/BackToTop';
import PowerByGiphy from '../common/PowerByGiphy';
import GifAddModal from '../common/GifAddModal';

const LIMIT = 30;

class Search extends React.Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleMore = this.handleMore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            gifs: [],
            pagination: {
                offset: 0,
                total_count: 1
            },
            query: '',
            selected: {}
        };
    }
    handleSearch(val = 'nothing') {
        GiphyAPI
            .search({
                query: val,
                limit: LIMIT
            })
            .then((body) => {
                this.setState({
                    query: val,
                    gifs: body.data,
                    pagination: body.pagination
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleMore() {
        let pagination = this.state.pagination,
            query = this.state.query;

        if (pagination.offset < pagination.total_count && query !== '') {
            GiphyAPI
                .search({
                    query: query,
                    limit: LIMIT,
                    offset: pagination.offset + LIMIT
                })
                .then((body) => {
                    this.setState({
                        query: query,
                        gifs: this.state.gifs.concat(body.data),
                        pagination: body.pagination
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    handleClick(gif) {
        this.setState({
            selected: {
                url: gif.images.downsized.url,
                still_url: gif.images.downsized_still.url
            }
        });
        GifAddModal.show();
    }
    handleAdd(name, url, still_url) {
        this.props.actions.create(name, url, still_url);
        GifAddModal.hide();
        this.props.goTo('/gifs');
    }
    render() {
        return (
            <div id="Search" className="col-xs-12">
                <div className="row">
                    <SearchForm handleSearch={this.handleSearch} />
                </div>
                <div className="row">
                    <SearchGifsView
                        gifs={this.state.gifs}
                        query={this.state.query}
                        pagination={this.state.pagination}
                        loadMore={this.handleMore}
                        click={this.handleClick}
                    />
                </div>
                <BackToTop />
                <PowerByGiphy />
                <GifAddModal
                    url={this.state.selected.url}
                    still_url={this.state.selected.still_url}
                    onSuccess={this.handleAdd} />
            </div>
        );
    }
};

export default Search;