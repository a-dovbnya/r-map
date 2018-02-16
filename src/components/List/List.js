import React, { Component } from 'react';
import styled from 'styled-components';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {connect} from 'react-redux';

import {getItems} from '../../reducers';
import {sortData} from '../../actions/setPlace';

import RemoveBtn from '../RemoveBtn/RemoveBtn';

const SortableItem = SortableElement(({value, className, dataId}) =>
  <div className = {className} data-id={dataId}>
    {value}
    <RemoveBtn/>
  </div>
);

const SortableList = SortableContainer(({items, className}) => {
  return (
    <div className = {className}>
      {items.map((el, index) => (
        <ListItem key={`item-${index}`} index={index} value={el.name} dataId={index}/>
      ))}
    </div>
  );
});

// Styles
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
    position: relative;
    transition: background 0.25s ease;

    &:nth-last-child(1){
        border-bottom: none;
    }

    &:hover {
        background: rgba(24,144,255,0.1);
    }
`;


class List extends Component {

    shouldCancelStart = (e) => {
        if( e.target.closest('[data-remove]') ){
            return true;
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let sortArray = arrayMove(this.props.items, oldIndex, newIndex)
        this.props.sortData( sortArray );
    }

    render (){
        const itemsLength = this.props.items.length;

        return (
            <div>
                { this.props.items.length > 0 && 
                    <ListWrap 
                        items={this.props.items} 
                        onSortEnd={this.onSortEnd} 
                        shouldCancelStart={this.shouldCancelStart} 
                        helperClass="draggable"
                    /> 
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: getItems(state)
});

const mapDispatchToProps = {
    sortData
}

export default connect(mapStateToProps, mapDispatchToProps)(List);