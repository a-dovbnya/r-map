import React, { PureComponent } from "react";
import { arrayMove } from "react-sortable-hoc";
import { connect } from "react-redux";
import { getItems, isGetRoute } from "../../reducers";
import { sortData } from "../../actions";

import { ListWrap } from "./SortableList";

export class List extends PureComponent {
  isEqualShallow(arr1, arr2) {
    let i, key;

    for (i = 0; i < arr1.length; i++) {
      for (key in arr1[i]) {
        if (arr2[i].hasOwnProperty(key) && arr1[i][key] === arr2[i][key]) {
          continue;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
