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
    handleSearchChange(e) {
        this.setState({
            query: e.target.value
        });
    }
    handleSearch() {
        this.props.handleSearch(this.state.query);

        this.setState({
            query: ''
        });
    }
    handleKeyPress(e) {
        if(e.which === 13) {
            this.props.handleSearch(this.state.query);
        }
    }
    render() {
        return (
            <div id="SearchForm" className="col-xs-6 col-xs-offset-3">
                <div className="input-group">
                    <input type="text" name="query" className="form-control ctrl-f" placeholder="Search gif" autoComplete="off" onChange={this.handleSearchChange} value={this.state.query} onKeyPress={this.handleKeyPress} />
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