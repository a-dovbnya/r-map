import styled from "styled-components";

export const StyledSortableList = Component =>
  styled(Component)`
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    padding: 0;
    list-style: none;
    margin-top: 20px;
    overflow-y: auto;
    max-height: 406px;
  `;
export const StyledListItem = Component =>
  styled(Component)`
    border-bottom: 1px solid #e8e8e8;
    padding: 5px 35px 5px 15px;
    cursor: move;
    font-size: 14px;
    font-family: Arial, "sans-serif";
    line-height: 1.5;
    position: relative;
    transition: background 0.25s ease;

    &:nth-last-child(1) {
      border-bottom: none;
    }

    &:hover {
      background: rgba(24, 144, 255, 0.1);
    }
  `;
