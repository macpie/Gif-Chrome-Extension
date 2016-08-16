import React from 'react';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchGifsView from '../components/search/SearchGifsView';
import PowerByImg from '../img/powered_by.png'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: [],
            pagination: {}
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleMore = this.handleMore.bind(this);
    }
    handleSearch(val) {
        GiphyAPI
            .search({
                query: val,
                limit: 9
            })
            .then((body) => {
                this.setState({
                    searching: val,
                    gifs: body.data,
                    pagination: body.pagination
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleMore() {
        GiphyAPI
            .search({
                query: this.state.searching,
                limit: 9,
                offset: this.state.pagination.offset + 9
            })
            .then((body) => {
                this.setState({
                    gifs: this.state.gifs.concat(body.data),
                    pagination: body.pagination
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <SearchForm handleSearch={this.handleSearch} />
                <SearchGifsView handleMore={this.handleMore} gifs={this.state.gifs} pagination={this.state.pagination} />
                <img src={PowerByImg} className="img-thumbnail center-block" role="presentation" />
            </div>
        );
    }
};

export default Search;