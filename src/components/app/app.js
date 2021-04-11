import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import gotService from '../../services/gotService';

const Btn = styled.button`
    padding: 12px;
    background-color: #1e2edb;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 40px;
    outline: none;
    box-shadow: 0px 0px 30px rgba(256,256,256,.1);
    cursor: pointer;
    :focus {
        outline: none;
    }
`

export default class App extends Component {
    gotService = new gotService();

    state = {
        toggleRandomChar: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                toggleRandomChar: !state.toggleRandomChar
            }
        });
    };

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.toggleRandomChar ? <RandomChar/> : null;  

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Btn 
                                onClick={this.toggleRandomChar}>
                                Toggle Random Character
                            </Btn>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}