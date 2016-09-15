import React, {
    PropTypes
} from 'react';
import {Col} from 'react-flexbox-grid/lib';
import AutoComplete from 'material-ui/AutoComplete';

class GifFilter extends React.Component {
    render() {
        return (
            <Col id="GifFilter" xs={6} xsOffset={3}>
                <AutoComplete
                    hintText="Filter"
                    floatingLabelText="Filter"
                    fullWidth={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    maxSearchResults={10}
                    searchText={this.props.filter}
                    dataSource={this.props.gifs}
                    dataSourceConfig={{
                        text: 'name',
                        value: 'id'
                    }}
                    onUpdateInput={this.props.onFilter}
                    onNewRequest={this.props.onSelect}
                />
            </Col>
        );
    }
};

GifFilter.propTypes = {
    gifs: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default GifFilter;