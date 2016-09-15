import React, {
    PropTypes
} from 'react';
import TextField from 'material-ui/TextField';

class SearchForm extends React.Component {
    render() {
        let timeout = null;

        const req = (val) => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                this.props.handleSearch(val);
            }, 500);
        };

        return (
            <div id="SearchForm" className="col-xs-6 col-xs-offset-3">
                <TextField
                    hintText="Search gif"
                    floatingLabelText="Search"
                    autoComplete="off"
                    onChange={(e) => {req(e.target.value)}}
                />
            </div>
        );
    }
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;