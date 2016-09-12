import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import * as GifActions from '../actions/GifActions';
import * as FilterActions from '../actions/FilterActions';
import Search from '../components/search';

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, GifActions, FilterActions), dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);