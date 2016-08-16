import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal'
import * as GifActions from '../../actions/GifActions';
import '../../css/GifFilter.css';

class GifFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        $('.typeahead').typeahead({
            source: this.props.gifs,
            afterSelect: function(gif) {
                GifActions.filter(gif.name);

                $('#copy')
                    .val(gif.url)
                    .select();

                document.execCommand('copy');
            }
        });
    }
    handleFilterChange(e) {
        GifActions.filter(e.target.value);
    }
    handleAdd() {
        $('#GifAddModal').modal('show');
    }
    render() {
        return (
            <div id="gifFilter" className="row">
                <div className="col-xs-6 col-xs-offset-3">
                    <div className="input-group">
                        <input type="text" name="filter" className="form-control typeahead" placeholder="Filter by name" onChange={this.handleFilterChange} />
                        <div className="input-group-btn">
                            <button className="btn btn-default" onClick={this.handleAdd}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <GifAddModal />
            </div>
        );
    }
};

GifFilter.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifFilter;