import React, {
    PropTypes
} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import './css/GifFilter.css';

class GifFilter extends React.Component {
    render() {
        return (
            <div id="GifFilter" className="col-xs-6 col-xs-offset-3">
                <AutoComplete
                    hintText="Filter"
                    floatingLabelText="Filter"
                    fullWidth={true}
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
            </div>
        );
    }
};

GifFilter.propTypes = {
    gifs: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default GifFilter;