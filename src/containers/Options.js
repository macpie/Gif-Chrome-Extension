import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import * as GifsActions from '../actions/GifsActions';
import Options from '../components/options';

const mapStateToProps = (state) => {
    return {
        gifs: state.gifs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, GifsActions), dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Options);