import React, {
    PropTypes
} from 'react';
import './css/GifFilter.css';

class GifFilter extends React.Component {
    componentDidMount() {
        var self = this;

        $('.typeahead').typeahead({
            source: this.props.gifs,
            afterSelect: function(gif) {
                self.props.select(gif);
            }
        });
    }
    render() {
        return (
            <div id="GifFilter" className="col-xs-6 col-xs-offset-3">
                <div className="input-group">
                    <input type="text" name="filter" className="form-control typeahead ctrl-f" placeholder="Filter by name" autoComplete="off" onChange={this.props.filter} />
                    <div className="input-group-btn">
                        <button className="btn btn-default" onClick={this.props.add}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

GifFilter.propTypes = {
    gifs: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
};

export default GifFilter;