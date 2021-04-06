import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';

const CharacterDet = styled.div`
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

const Error = styled.span`
    color: #fff;
    font-size: 23px;
`

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount () {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return;
        } else {
            this.gotService.getCharacter(charId)
                .then((char) => {
                    this.setState({char})
                })
        }
    }

    render() {

        if (!this.state.char) {
            return <Error>Please select a character</Error>
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <CharacterDet className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <Detail className="list-group-item">
                        <span>Gender</span>
                        <span>{gender}</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Born</span>
                        <span>{born}</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Died</span>
                        <span>{died}</span>
                    </Detail>
                    <Detail className="list-group-item">
                        <span>Culture</span>
                        <span>{culture}</span>
                    </Detail>
                </ul>
            </CharacterDet>
        );
    }
}