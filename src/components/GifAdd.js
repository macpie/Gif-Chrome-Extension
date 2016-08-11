import React from 'react';
import * as GifActions from '../actions/GifActions';

class GifAdd extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleUrlChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    handleSave(e) {
        GifActions.create(this.state.url, this.state.name);
    }
    render() {
        return (
            <form id="add">
                <input type="text" name="name" placeholder="Name" onChange={this.handleNameChange} />
                <input type="text" name="url" placeholder="Url" onChange={this.handleUrlChange} />
                <button type="button" onClick={this.handleSave}>Save</button>
            </form>
        );
    }
};

export default GifAdd;