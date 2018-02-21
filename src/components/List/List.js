import React, { PureComponent } from "react";
import styled from "styled-components";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import { connect } from "react-redux";

import { getItems, isGetRoute } from "../../reducers";
import { sortData } from "../../actions";

import RemoveBtn from "../RemoveBtn/RemoveBtn";

const SortableItem = SortableElement(({ value, className, dataId }) => (
  <div className={className} data-id={dataId}>
    {value}
    <RemoveBtn />
  </div>
));

const SortableList = SortableContainer(({ items, className }) => {
  return (
    <div className={className}>
      {items.map((el, index) => (
        <ListItem
          key={`item-${index}`}
          index={index}
          value={el.name}
          dataId={index}
        />
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

class List extends PureComponent {
  isEqualShallow(arr1, arr2) {
    let i, key;

    for (i = 0; i < arr1.length; i++) {
      for (key in arr1[i]) {
        if (arr2[i].hasOwnProperty(key) && arr1[i][key] === arr2[i][key]) {
          break;
        } else {
          return false;
        }
      }
    }

    return true;
  }

  shouldCancelStart = e => {
    if (e.target.closest("[data-remove]")) {
      return true;
    }
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    let sortArray = arrayMove(this.props.items, oldIndex, newIndex);

    if (
      !this.isEqualShallow(this.props.items, sortArray) &&
      !this.props.isGetRoute
    ) {
      this.props.sortData(sortArray);
    }
  };

  render() {
    return (
      <div>
        {this.props.items.length > 0 && (
          <ListWrap
            items={this.props.items}
            onSortEnd={this.onSortEnd}
            shouldCancelStart={this.shouldCancelStart}
            helperClass="draggable"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: getItems(state),
  isGetRoute: isGetRoute(state)
});

const mapDispatchToProps = {
  sortData
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
