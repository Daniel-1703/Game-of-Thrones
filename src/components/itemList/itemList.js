import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

const List = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch() {
        this.setState({
            charList: null,
            error: true
        })
    }

    onError(status) {
        this.setState({
            charList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <List 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}>
                    {name}
                </List>
            )
        })
    }

    render() {

        const {charList, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}