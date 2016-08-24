import React from 'react';
import PowerByImg from './media/powered_by.png'
import './css/PowerByGiphy.css'

class PowerByGiphy extends React.Component {
    render() {
        return (
            <img id="PowerByGiphy" src={PowerByImg} className="img-thumbnail center-block" role="presentation" />
        );
    }
};

export default PowerByGiphy;