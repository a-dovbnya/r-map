import React from "react";
import {
  SortableContainer
} from "react-sortable-hoc";

import ListItem from "./styledComponents";

export const SortableList = SortableContainer(({ items, className }) => {
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