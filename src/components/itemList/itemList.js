import React, {Component} from 'react';
import styled from 'styled-components';

const List = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {

    render() {
        return (
            <ul className="item-list list-group">
                <List className="list-group-item">
                    John Snow
                </List>
                <List className="list-group-item">
                    Brandon Stark
                </List>
                <List className="list-group-item">
                    Geremy
                </List>
            </ul>
        );
    }
}