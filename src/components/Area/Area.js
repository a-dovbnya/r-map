import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { setPlace } from "../../actions";
import { isGetRoute } from "../../reducers";
import { Input } from "./styledComponents";

export class Area extends PureComponent {
  keyDownHandler = e => {
    if (e.keyCode === 13) {
      this.props.setPlace(e.target.value);
      e.target.value = "";
    }
  };

  componentDidUpdate() {
    if (!this.props.isGetRoute) {
      this.input.focus();
    }
  }

  render() {
    return (
      <Input
        onKeyDown={this.keyDownHandler}
        placeholder="Введите точку маршрута"
        disabled={this.props.isGetRoute}
        innerRef={input => {
          this.input = input;
        }}
      /> 
    );
  }
}

const mapStateToProps = state => ({
  isGetRoute: isGetRoute(state)
});

const mapDispatchToProps = {
  setPlace
};

export default connect(mapStateToProps, mapDispatchToProps)(Area);
