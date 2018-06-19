import React from "react";
import {
    SortableElement
} from "react-sortable-hoc";

import RemoveBtn from "../RemoveBtn/RemoveBtn";

export const SortableItem = SortableElement(({ value, className, dataId }) => (
    <div className={className} data-id={dataId}>
      {value}
      <RemoveBtn />
    </div>
  ));