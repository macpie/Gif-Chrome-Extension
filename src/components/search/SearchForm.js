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
        this.props.handleSearch(this.state.search);
    }
    render() {
        return (
            <div id="searchForm" className="row">
                <div className="col-xs-6 col-xs-offset-3">
                    <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Search gif" onChange={this.handleSearchChange} />
                        <div className="input-group-btn">
                            <button className="btn btn-default" onClick={this.handleSearch}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
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