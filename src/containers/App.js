import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as GifActions from '../actions/GifActions';
import App from '../components';

const mapStateToProps = (state) => {
    return {
        gifs: state.gifs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(GifActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);