import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const Error = styled.img`
    height: 223px;
`

const ErrorMessage = () => {
    return (
        <>
            <Error src={img} alt='error'></Error>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;