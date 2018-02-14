import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    padding: 4px 11px;
    height: 32px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;

    &:focus {
        border-color: #40a9ff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

`;


class Area extends PureComponent {
    render (){
        return (
            <Input />
        );
    }
}

export default Area;