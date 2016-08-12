import React from 'react';
import * as GiphyAPI from '../apis/GiphyAPI';
import SearchForm from '../components/search/SearchForm';
import SearchView from '../components/search/SearchView';

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
                query: val
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
            <div className="row">
                <SearchForm doSearch={this.doSearch} />
                <SearchView gifs={this.state.gifs} />
            </div>
        );
    }
};

export default Search;