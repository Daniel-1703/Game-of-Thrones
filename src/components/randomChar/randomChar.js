import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

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

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
    
    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }
    
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*200 + 50);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <CharacterRand className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharacterRand>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <Detail className="list-group-item">
                    <span>Gender </span>
                    <span>{gender}</span>
                </Detail>
                <Detail className="list-group-item">
                    <span>Born </span>
                    <span>{born}</span>
                </Detail>
                <Detail className="list-group-item">
                    <span>Died </span>
                    <span>{died}</span>
                </Detail>
                <Detail className="list-group-item">
                    <span>Culture </span>
                    <span>{culture}</span>
                </Detail>
            </ul>
        </>
    )
}