import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { setPlace } from "../../actions";
import { isGetRoute } from "../../reducers";

export const Input = styled.input`
  width: 100%;
  padding: 4px 38px 4px 11px;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;

  &:focus {
    border-color: #40a9ff;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

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
