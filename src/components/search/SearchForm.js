import React, {
    PropTypes
} from 'react';
import TextField from 'material-ui/TextField';

class SearchForm extends React.Component {
    render() {
        return (
            <div id="SearchForm" className="col-xs-6 col-xs-offset-3">
                <TextField
                    hintText="Search gif"
                    floatingLabelText="Search"
                    autoComplete="off"
                    onChange={(e) => {this.props.handleSearch(e.target.value)}}
                />
            </div>
        );
    }
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;