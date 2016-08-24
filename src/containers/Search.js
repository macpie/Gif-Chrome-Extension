import React from 'react';
import * as _ from 'lodash';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchGifsView from '../components/search/SearchGifsView';
import BackToTop from '../components/common/BackToTop';
import PowerByGiphy from '../components/common/PowerByGiphy';

const LIMIT = 30;

class Search extends React.Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);

        this.state = {
            gifs: [],
            pagination: {
                offset: 0,
                total_count: 1
            },
            query: ''
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
                <PowerByGiphy />
            </div>
        );
    }
};

export default Search;