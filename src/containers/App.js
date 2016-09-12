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
import App from '../components';

const mapStateToProps = (state) => {
    return {
        gifs: state.gifs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(GifActions, dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);