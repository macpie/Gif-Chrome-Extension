import React, {
    PropTypes
} from 'react';
import './css/BackToTop.css'

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

        $(container).on('scroll', function() {
            if ($(this).scrollTop() >= 50) {
                $('#BackToTop').fadeIn(200);
            } else {
                $('#BackToTop').fadeOut(200);
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
            <i id="BackToTop"
                className="fa fa-arrow-up fa-3x"
                aria-hidden="true"
                onClick={this.handleClick} />
        );
    }
};

BackToTop.propTypes = {
    container: PropTypes.string
};

export default BackToTop;