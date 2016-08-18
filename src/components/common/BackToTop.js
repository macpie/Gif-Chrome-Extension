import React from 'react';
import '../../css/BackToTop.css'

class BackToTop extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() >= 50) {
                $('#BackToTop').fadeIn(200);
            } else {
                $('#BackToTop').fadeOut(200);
            }
        });
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
    handleClick() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
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

export default BackToTop;