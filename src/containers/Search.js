import React from 'react';
import * as _ from 'lodash';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchGifsView from '../components/search/SearchGifsView';
import BackToTop from '../components/common/BackToTop';
import PowerByImg from '../img/powered_by.png'
import '../css/Search.css'

const LIMIT = 30;
const DEFAULT_STATE = {
    gifs: [],
    pagination: {
        offset: 0,
        total_count: 1
    },
    query: ''
};

class Search extends React.Component {
    constructor() {
        super();

        this.state = DEFAULT_STATE;

        this.handleSearch = this.handleSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }
    handleSearch(val = 'nothing') {
        this.setState(DEFAULT_STATE);

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
    loadMore() {
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
    render() {
        let gifs = _.chunk(this.state.gifs, 3);

        return (
            <div id="Search" className="col-xs-12">
                <div className="row">
                    <SearchForm handleSearch={this.handleSearch} />
                </div>
                <div className="row">
                    <SearchGifsView
                        query={this.state.query}
                        pagination={this.state.pagination}
                        loadMore={this.loadMore}>
                        {gifs}
                    </SearchGifsView>
                </div>
                <BackToTop />
                <img src={PowerByImg} className="img-thumbnail center-block" role="presentation" />
            </div>
        );
    }
};

export default Search;