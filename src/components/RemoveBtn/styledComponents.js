import styled from "styled-components";

export const IconWrapp = styled.div`
    position: absolute;
    right: 14px;
    bottom: 0;
    margin: auto;
    top: 0;
    width: 13px;
    height: 15px;
    cursor: pointer;

    svg {
    width: 100%;
    height: auto;

    path {
        fill: #d9d9d9;
        transition: 0.25s ease;
    }

    &:hover {
        path {
        fill: rgba(244, 54, 76, 0.8);
        }
    }
    }
`;