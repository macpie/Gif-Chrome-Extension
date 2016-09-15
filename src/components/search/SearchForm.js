import React, {
    PropTypes
} from 'react';
import {Col} from 'react-flexbox-grid/lib';
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
            <Col id="GifFilter" xs={6} xsOffset={3}>
                <TextField
                    hintText="Search gif"
                    floatingLabelText="Search"
                    autoComplete="off"
                    onChange={(e) => {req(e.target.value)}}
                />
            </Col>
        );
    }
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;