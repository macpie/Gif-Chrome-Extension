import React from 'react';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchGifsView from '../components/search/SearchGifsView';
import PowerByImg from '../img/powered_by.png'
import '../css/Search.css'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: [],
            pagination: {},
            limit: 12
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleOffSet = this.handleOffSet.bind(this);
    }
    handleSearch(val) {
        GiphyAPI
            .search({
                query: val,
                limit: this.state.limit
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
    handleOffSet(type = 'next') {
        let offset = this.state.pagination.offset + this.state.limit;

        if(type !== 'next') {
            offset = this.state.pagination.offset - this.state.limit;
        }

        GiphyAPI
            .search({
                query: this.state.searching,
                limit: this.state.limit,
                offset: offset
            })
            .then((body) => {
                this.setState({
                    gifs: body.data,
                    pagination: body.pagination
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div id="Search">
                <SearchForm handleSearch={this.handleSearch} />
                <SearchGifsView searching={this.state.searching} handleOffSet={this.handleOffSet} gifs={this.state.gifs} pagination={this.state.pagination} />
                <img src={PowerByImg} className="img-thumbnail center-block" role="presentation" />
            </div>
        );
    }
};

export default Search;