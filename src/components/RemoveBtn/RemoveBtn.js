import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { sortData } from "../../actions";
import { getItems } from "../../reducers";
import { IconWrapp } from "./styledComponents";

class RemoveBtn extends PureComponent {
  removeClickHandler = e => {
    e.stopPropagation();

    const id = e.target.closest("[data-id]").getAttribute("data-id");
    const items = this.props.items.filter(
      (el, index) => index !== parseInt(id, 10)
    );

    this.props.sortData(items);
  };
  render() {
    return (
      <IconWrapp
        title="Удалить точку"
        onClick={this.removeClickHandler}
        data-remove="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16.5"
          height="18.844"
          viewBox="0 0 16.5 18.844"
        >
          <path
            fillRule="evenodd"
            d="M132,34.592a0.44,0.44,0,0,0,.442.442H148.06a0.44,0.44,0,0,0,.442-0.442V33.561a0.881,0.881,0,0,0-.884-0.884h-4.126l-0.331-.7a0.826,0.826,0,0,0-.332-0.35,0.932,0.932,0,0,0-.478-0.129h-4.2a0.932,0.932,0,0,0-.478.129,0.826,0.826,0,0,0-.332.35l-0.331.7h-4.126a0.881,0.881,0,0,0-.884.884v1.031Zm15.323,2.063a0.44,0.44,0,0,0-.442-0.442h-13.26a0.44,0.44,0,0,0-.442.442V48.589a1.76,1.76,0,0,0,1.768,1.768h10.608a1.76,1.76,0,0,0,1.768-1.768V36.655ZM137.3,39.16v8.251a0.59,0.59,0,1,1-1.179,0V39.16A0.59,0.59,0,1,1,137.3,39.16Zm3.536,0v8.251a0.589,0.589,0,1,1-1.178,0V39.16A0.589,0.589,0,1,1,140.84,39.16Zm3.536,0v8.251a0.589,0.589,0,1,1-1.178,0V39.16A0.589,0.589,0,1,1,144.376,39.16Z"
            transform="translate(-132 -31.5)"
          />
        </svg>
      </IconWrapp>
    );
  }
}

const mapStateToProps = state => ({
  items: getItems(state)
});
const mapDispatchToProps = {
  sortData
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveBtn);
