import React, {
    PropTypes
} from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        $('#SearchFormInput').focus();
    }
    handleSearchChange(e) {
        this.setState({
            query: e.target.value
        });
    }
    handleSearch() {
        if(this.state.query === '') {
            this.props.handleSearch('nothing');
        } else {
            this.props.handleSearch(this.state.query);
        }

        this.setState({
            query: ''
        });
    }
    handleKeyPress(e) {
        if(e.which === 13) {
            this.handleSearch();
        }
    }
    render() {
        return (
            <div id="SearchForm" className="col-xs-6 col-xs-offset-3">
                <div className="input-group">
                    <input id="SearchFormInput" type="text" name="query" className="form-control" placeholder="Search gif" onChange={this.handleSearchChange} value={this.state.query} onKeyPress={this.handleKeyPress} />
                    <div className="input-group-btn">
                        <button className="btn btn-default" onClick={this.handleSearch}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;