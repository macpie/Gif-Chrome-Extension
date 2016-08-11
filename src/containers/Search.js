import React from 'react';
import SearchForm from '../components/SearchForm';
import SearchView from '../components/SearchView';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            search: ''
        };

        this.doSearch = this.doSearch.bind(this);
    }
    doSearch(val) {
        this.setState({
            search: val
        });
    }
    render() {
        return (
            <div id="main">
                <SearchForm doSearch={this.doSearch} />
                <SearchView search={this.state.search} />
            </div>
        );
    }
};

export default Search;