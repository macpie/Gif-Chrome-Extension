import React from 'react';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchGifsView from '../components/search/SearchGifsView';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: []
        };

        this.doSearch = this.doSearch.bind(this);
    }
    doSearch(val) {
        GiphyAPI
            .search({
                query: val,
                limit: 9
            })
            .then((body) => {
                this.setState({
                    gifs: body.data
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }
    render() {
        return (
            <div>
                <SearchForm doSearch={this.doSearch} />
                <SearchGifsView gifs={this.state.gifs} />
            </div>
        );
    }
};

export default Search;