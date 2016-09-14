import React, {
    PropTypes
} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import UpIcon from 'material-ui/svg-icons/navigation/arrow-upward';

class BackToTop extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            container: this.props.container || window
        };
    }
    componentDidMount() {
        let container = this.state.container;

        $('#BackToTop').hide();

        $(container).on('scroll', function() {
            if ($(this).scrollTop() >= 150) {
                $('#BackToTop').fadeIn(500);
            } else {
                $('#BackToTop').fadeOut(500);
            }
        });
    }
    componentWillUnmount() {
        let container = this.state.container;

        $(container).off('scroll');
    }
    handleClick() {
        let container = this.state.container;

        if (typeof container === 'string') {
            $(container).animate({
                scrollTop: 0
            }, 500);
        } else {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        }
    }
    render() {
        return (
            <FloatingActionButton
                id="BackToTop"
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                }}
                onClick={this.handleClick}
            >
                <UpIcon />
            </FloatingActionButton>
        );
    }
};

BackToTop.propTypes = {
    container: PropTypes.string
};

export default BackToTop;