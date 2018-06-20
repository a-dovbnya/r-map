import React from "react";
import { SortableElement } from "react-sortable-hoc";

import RemoveBtn from "../RemoveBtn/RemoveBtn";
import { StyledListItem } from "./styledComponents";

const SortableItem = SortableElement(({ value, className, dataId }) => (
  <div className={className} data-id={dataId}>
    {value}
    <RemoveBtn />
  </div>
));

export const ListItem = StyledListItem(SortableItem);
