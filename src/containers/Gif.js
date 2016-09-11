import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as _ from 'lodash';
import * as GifActions from '../actions/GifActions';
import * as FilterActions from '../actions/FilterActions';
import Gif from '../components/gif';

const mapStateToProps = (state) => {
    return {
        gifs: _.toArray(state.gifs),
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, GifActions, FilterActions), dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gif);