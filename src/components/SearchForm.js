import React, {
    PropTypes
} from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearchChange(e) {
        this.setState({
            search: e.target.value
        });
    }
    handleSearch(e) {
        this.props.doSearch(this.state.search);
    }
    render() {
        return (
            <form id="filter">
                <input type="text" name="search" placeholder="Search gif" onChange={this.handleSearchChange} />
                <button type="button" onClick={this.handleSearch}>Search</button>
            </form>
        );
    }
};

SearchForm.propTypes = {
    doSearch: PropTypes.func.isRequired
};

export default SearchForm;