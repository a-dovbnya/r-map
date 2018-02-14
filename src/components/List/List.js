import React, { Component } from 'react';
import styled from 'styled-components';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
//import './List.css';

//const ListItem = ({className, children}) => <li className={className}>{children}</li>
//const ListItem1 = (props) => <li>{props.children}</li>

const SortableItem = SortableElement(({value, className}) =>
  <div className = {className}>{value}</div>
);

const SortableList = SortableContainer(({items, className}) => {
  return (
    <div className = {className}>
      {items.map((value, index) => (
        <ListItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

// Стили
const ListWrap = styled(SortableList)`
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    padding: 0;
    list-style: none;
    margin-top: 20px;
`;

const ListItem = styled(SortableItem)`
    border-bottom: 1px solid #e8e8e8;
    padding: 5px 15px;
    cursor: move;
    font-size: 14px;
    font-family: Arial, 'sans-serif';
    line-height: 1.5;
    transition: 0.25s ease;

    &:nth-last-child(1){
        border-bottom: none;
    }

    &:hover {
        background: rgba(24,144,255,0.1);
    }
`;

// Исходные данные
/* let list = [
    'Item_1',
    'Item_2',
    'Item_3',
    'Item_4'
]; */


class List extends Component {
    state = {
        items:  [
            'Item_1',
            'Item_2',
            'Item_3',
            'Item_4'
        ]
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        // массив с новыми данными 
        console.log( arrayMove(this.state.items, oldIndex, newIndex));
        this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)});
    };
    render (){
        return (
            <ListWrap items={this.state.items} onSortEnd={this.onSortEnd} helperClass="draggable"/>
        );
    }
}

export default List;