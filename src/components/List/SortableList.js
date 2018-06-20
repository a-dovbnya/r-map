import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { StyledSortableList } from "./styledComponents";
import { ListItem } from "./SortableItem";

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

export const ListWrap = StyledSortableList(SortableList);
