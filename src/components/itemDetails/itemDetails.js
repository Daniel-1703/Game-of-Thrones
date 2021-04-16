import React, {Component} from 'react';
import styled from 'styled-components';
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

const Field = ({item, field, label}) => {
    return (
        <Detail className="list-group-item">
            <span>{label}</span>
            <span>{item[field]}</span>
        </Detail>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount () {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if(!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
            .catch(() => this.onError())
    } 


    onError() {
        this.setState({
            item: null,
            loading: false,
            error: true
        })
    }

    render() {
        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <Error>Please select item in the list</Error>
        }
        const {item, loading, error} = this.state;
        const {name} = item;
        
        if (loading) {
            <CharacterDet className="rounded">
                <Spinner/>
            </CharacterDet>
        }

        return (
            <CharacterDet className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </CharacterDet>
        );
        
    }
}