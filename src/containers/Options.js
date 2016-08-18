import React from 'react';
import * as _ from 'lodash';
import Infinite from 'react-infinite';

class Img extends React.Component {
    render() {
        return (
            <div className="thumbnail">
                <img src="http://media2.giphy.com/media/geozuBY5Y6cXm/giphy.gif" alt="..." />
            </div>
        );
    }
};

class View extends React.Component {
    render() {
        return (
            <div className="col-xs-4">
                {this.props.children}
            </div>
        );
    }
};

class Row extends React.Component {
    render() {
        let children = this.props.children.map((child, i) => {
            return (<View key={i}>{child}</View>);
        });

        return (
            <div className="row">
                {children}
            </div>
        );
    }
};

class Rows extends React.Component {
    constructor(props) {
        super(props);

        this.onInfiniteLoad = this.onInfiniteLoad.bind(this);
    }
    onInfiniteLoad() {
        this.props.more();
    }
    render() {
        let children = this.props.children.map((child, i) => {
            return (<Row key={i}>{child}</Row>);
        });

        return (
            <Infinite
                className="col-xs-12"
                useWindowAsScrollContainer={true}
                elementHeight={230}
                infiniteLoadBeginEdgeOffset={690}
                onInfiniteLoad={this.onInfiniteLoad}>
                {children}
            </Infinite>
        );
    }
};

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.more = this.more.bind(this);

        this.state = {
            data: [],
            max: 0
        };

        for (var i = 0; i < 20; i++) {
            this.state.data.push(<Img key={i} />);
        }
    }
    more() {
        if (this.state.max < 4) {
            console.log('more', this.state.max);

            let data = [];

            for (var i = 0; i < 20; i++) {
                data.push(<Img key={i} />);
            }

            this.setState({
                data: this.state.data.concat(data),
                max: this.state.max + 1
            })
        } else {
            console.log('no more');
        }
    }
    render() {
        let data = this.state.data,
            chunk = _.chunk(data, 3);

        return (<Rows more={this.more}>{chunk}</Rows>);
    }
};

export default Options;