import React from 'react';
import Divider from 'material-ui/Divider';
import Import from './Import';
import Export from './Export';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.importSuccess = this.importSuccess.bind(this);
        this.importFailure = this.importFailure.bind(this);
        this.resetPriorities = this.resetPriorities.bind(this);
    }
    importSuccess(data) {
        this.props.actions.import_data(data);

        toastr.success('GIFs imported!');
        this.props.goTo('/gifs');
    }
    importFailure() {
        toastr.warning('Make sure file is proper JSON', 'Failed to import');
    }
    render() {
        return (
            <div id="Options" className="col-xs-6 col-xs-offset-3">
                <Import onSuccess={this.importSuccess} onFailure={this.importFailure} />
                <Divider />
                <Export gifs={this.props.gifs} />
            </div>
        );
    }
};

export default Options;