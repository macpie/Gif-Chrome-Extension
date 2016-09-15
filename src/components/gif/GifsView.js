import React, {
    PropTypes
} from 'react';
import {
    GridList
} from 'material-ui/GridList';
import BackToTop from '../common/BackToTop';
import GifView from './GifView';

class GifsView extends React.Component {
    componentDidMount() {
        let base = 800,
            factor = 1;

        $(window).on('scroll', () => {
            if ($(window).scrollTop() > base * factor) {
                this.props.loadMoreGifs();
                factor++;
            }
        });
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
    render() {
        let gifs = this.props.gifs;

        return (
            <div id="GifsView" className="col-xs-12">
                <GridList cols={3}>
                    {gifs.map((gif) => (
                        <GifView
                            key={gif.id}
                            gif={gif}
                            onCopy={this.props.onCopy}
                            onSelect={this.props.onSelect}
                        />
                    ))}
                </GridList>
                <BackToTop />
            </div>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired,
    loadMoreGifs: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default GifsView;