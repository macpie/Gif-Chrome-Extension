import React from 'react';

class Copy extends React.Component {
    render() {
        return (
            <input
                type="text"
                id="copy"
                style={{
                    position: "absolute",
                    width: 10,
                    top: -20,
                    left: -20
                }}
            />
        );
    }
};

export default Copy;