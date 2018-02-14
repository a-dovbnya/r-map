import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    margin-top: 20px;
    background: #f0f0f0;
    padding: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(244, 54, 76, 0.8);

`;


class ErrorBox extends PureComponent {
    render (){
        return (
            <ErrorContainer>Объект не найден</ErrorContainer>
        );
    }
}

export default ErrorBox;