import React from 'react';
import {Row, Col} from 'react-flexbox-grid/lib';
import * as GiphyAPI from '../../apis/GiphyAPI';
import SearchForm from './SearchForm';
import SearchGifsView from './SearchGifsView';
import GifAddModal from '../common/GifAddModal';
import PowerByGiphy from '../common/PowerByGiphy';

const LIMIT = 30;

class Search extends React.Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleMore = this.handleMore.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            gifs: [],
            pagination: {
                offset: 0,
                total_count: 0
            },
            query: '',
            selected: {},
            showModal: false
        };
    }
    handleSearch(val = 'nothing') {
        GiphyAPI
            .search({
                query: val,
                limit: LIMIT
            })
            .then((body) => {
                this.setState({
                    query: val,
                    gifs: body.data,
                    pagination: body.pagination
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleMore() {
        let pagination = this.state.pagination,
            query = this.state.query;

        if (pagination.offset <= pagination.total_count && query !== '') {
            GiphyAPI
                .search({
                    query: query,
                    limit: LIMIT,
                    offset: pagination.offset + LIMIT
                })
                .then((body) => {
                    this.setState({
                        query: query,
                        gifs: this.state.gifs.concat(body.data),
                        pagination: body.pagination
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    handleSelect(gif) {
        this.setState({
            selected: {
                url: gif.images.downsized.url,
                still_url: gif.images.downsized_still.url
            },
            showModal: true
        });
    }
    handleAdd(name, url, still_url) {
        this.props.actions.create(name, url, still_url);

        this.setState({
            showModal: false
        });

        this.props.goTo('/gifs');
    }
    closeModal(gif) {
        this.setState({
            showModal: false
        });
    }
    render() {
        return (
            <Col id="Search" xs={12}>
                <Row>
                    <SearchForm handleSearch={this.handleSearch} />
                </Row>
                <Row>
                    <SearchGifsView
                        gifs={this.state.gifs}
                        query={this.state.query}
                        pagination={this.state.pagination}
                        loadMore={this.handleMore}
                        onSelect={this.handleSelect}
                    />
                </Row>
                <PowerByGiphy />
                <GifAddModal
                    open={this.state.showModal}
                    url={this.state.selected.url}
                    stillUrl={this.state.selected.still_url}
                    onSuccess={this.handleAdd}
                    onCancel={this.closeModal}
                />
            </Col>
        );
    }
};

export default Search;