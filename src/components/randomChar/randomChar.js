import React, {Component} from 'react';
import styled from 'styled-components';

const CharacterRand = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`

const Detail = styled.li`
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
        font-weight: bold;
    }
`

   
export default class RandomChar extends Component {

    render() {

        return (
            <CharacterRand className="rounded">
                <h4>Random Character: John</h4>
                <ul className="list-group list-group-flush">
                    <Detail className="list-group-item">
                        <span>Gender </span>
                        <span>male</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Born </span>
                        <span>11.03.1039</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Died </span>
                        <span>13.09.1089</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Culture </span>
                        <span>Anarchy</span>
                    </Detail>
                </ul>
            </CharacterRand>
        );
    }
}
