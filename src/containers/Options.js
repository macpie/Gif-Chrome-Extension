import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as GifsActions from '../actions/GifsActions';
import Options from '../components/options';

const mapStateToProps = (state) => {
    return {
        gifs: state.gifs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Object.assign({}, GifsActions), dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Options);