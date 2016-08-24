import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import Infinite from 'react-infinite';
import GifsRow from './GifsRow';

class GifsView extends React.Component {
    render() {
        let children = [],
            gifs = _.chunk(this.props.gifs, 3)

        if (gifs.length) {
            children = gifs.map((gifsChunk) => {
                let key = '';

                gifsChunk.forEach((o) => {
                    key += o.id.substring(0, 5)
                });

                return (
                    <GifsRow
                        key={key}
                        gifs={gifsChunk}
                        copy={this.props.copy}
                        delete={this.props.delete}
                        upload={this.props.upload}
                        edit={this.props.edit}
                        download={this.props.download}
                    />
                );
            });
        }

        let width = $(window).width(),
            height;

        if (width < 800) {
            height = 150;
        } else if (width < 1000) {
            height = 180;
        } else if (width < 1000) {
            height = 200;
        } else {
            height = 290;
        }

        return (
            <Infinite
                className="col-xs-12 gifs-view"
                useWindowAsScrollContainer={true}
                elementHeight={height}
                infiniteLoadBeginEdgeOffset={height*3}
                onInfiniteLoad={this.props.loadMoreGifs}>
                {children}
            </Infinite>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired,
    loadMoreGifs: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
};

export default GifsView;