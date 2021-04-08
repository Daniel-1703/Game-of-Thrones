import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

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
        char: null,
        loading: true,
        error: false
    }

    componentDidMount () {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharDetLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return;
        } 

        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then(this.onCharDetLoaded)
            .catch(() => this.onError())
    }

    onError() {
        this.setState({
            char: null,
            error: true
        })
    }

    render() {
        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <Error>Please select a character</Error>
        }

        const {name, gender, born, died, culture} = this.state.char;

        if (this.state.loading) {
            return (
                <CharacterDet className="rounded">
                    <Spinner/>
                </CharacterDet>
            )
        }

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