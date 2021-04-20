import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const Error = styled.img`
    height: 223px;
    margin-left: 43px;
`
const Sp = styled.span`
    margin-left: 155px;
`

const ErrorMessage = () => {
    return (
        <>
            <Error src={img} alt='error'></Error>
            <br/><Sp>Something goes wrong</Sp>
        </>
    )
}

export default ErrorMessage;