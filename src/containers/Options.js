import React from 'react';
import Infinite from 'react-infinite';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
        this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);

        let divs = [];

        for (let i = 0; i < 10; i++) {
            divs.push(<div style={{height: '120px', backgroundColor: 'yellow'}} />);
            divs.push(<div style={{height: '120px', backgroundColor: 'black'}} />);
        }

        this.state = {
            divs: divs,
            loading: false
        };
    }
    handleInfiniteLoad() {
        console.log("load");

        this.setState({
            loading: true
        });

        setTimeout(() => {
            let divs = [];

            for (let i = 0; i < 10; i++) {
                divs.push(<div style={{height: '120px', backgroundColor: 'red'}} />);
                divs.push(<div style={{height: '120px', backgroundColor: 'green'}} />);
            }

            this.setState({
                divs: this.state.divs.concat(divs),
                loading: false
            });
        }, 2000);
    }
     elementInfiniteLoad() {
        return (
            <div style="">
                Loading...
            </div>
        );
    }
    render() {

        return (
            <Infinite
                className="row"
                useWindowAsScrollContainer={true}
                elementHeight={120}
                infiniteLoadBeginEdgeOffset={400}
                loading={this.state.loading}
                loadingSpinnerDelegate={this.elementInfiniteLoad}
                onInfiniteLoad={this.handleInfiniteLoad}>
                {this.state.divs}
            </Infinite>
        );
    }
};

export default Options;