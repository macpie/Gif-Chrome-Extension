import React, {
    PropTypes
} from 'react';
import './css/SearchForm.css';

class SearchForm extends React.Component {
    componentDidMount() {
        let $input = $('#SearchForm input');

        $input.tagsinput();

        $input
            .on('itemAdded', (e) => {
                let tags = $input.tagsinput('items');

                this.props.handleSearch(tags.join('+'));
            })
            .on('itemRemoved', (e) => {
                let tags = $input.tagsinput('items');

                this.props.handleSearch(tags.join('+'));
            });
    }
    componentWillUnmount() {
        $('#SearchForm input').tagsinput('destroy');
    }
    render() {
        return (
            <div id="SearchForm" className="col-xs-6 col-xs-offset-3">
                <input type="text" placeholder="Search gif" autoComplete="off" />
            </div>
        );
    }
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;