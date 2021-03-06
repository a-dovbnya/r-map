import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Loader from "react-svg-spinner";

import List from "../List/List";
import Area from "../Area/Area";
import MapContainer from "../Map/Map";

import {
  getError,
  getFetching,
  isMapLoading,
  isGetRoute
} from "../../reducers";

const AppWrapper = styled.div`
  margin: 100px auto;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  min-height: 500px;
  position: relative;

  &,
  & * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 650px) {
    border: none;
    align-items: flex-start;
  }
`;

const ListWrapper = styled.div`
  width: 40%;
  border-right: 1px solid #f0f0f0;
  padding: 20px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

const MapWrapper = styled.div`
  width: 60%;
  position: relative;
  display: flex;

  @media screen and (max-width: 650px) {
    width: 100%;
    min-height: 500px;
    align-items: stretch;

    div {
      min-height: 350px;
    }
  }
`;

const LoaderWrapp = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .loading-title {
    color: #4d4d4d;
    font-size: 18px;
    text-align: center;
    width: 100%;
  }
  .loader {
    text-align: center;
  }

  @media screen and (max-width: 650px) {
    display: block;
  }
`;

const AreaWrapper = styled.div`
  position: relative;

  [data-name="listLoader"] {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 10px;
  }
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  background: #f0f0f0;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(244, 54, 76, 0.8);
`;

const LoaderContainder = props => (
  <LoaderWrapp>
    <div className="loader">
      <Loader size="70px" gap={4} color="#cccccc" />
      <div className="loading-title">{props.text}</div>
    </div>
  </LoaderWrapp>
);

const ErrorBox = props => <ErrorContainer>{props.error}</ErrorContainer>;

export class App extends PureComponent {
  render() {
    return (
      <AppWrapper>
        {this.props.isMapLoading && <LoaderContainder text="Загрузка карты" />}
        <ListWrapper>
          <AreaWrapper>
            <Area />
            {this.props.isFetching && (
              <Loader
                data-name="listLoader"
                size="20px"
                gap={4}
                color="#cccccc"
              />
            )}
          </AreaWrapper>
          <List />
          {this.props.error.length > 0 && <ErrorBox error={this.props.error} />}
        </ListWrapper>
        <MapWrapper>
          {this.props.isGetRoute && (
            <LoaderContainder text="Получение маршрута" />
          )}
          <MapContainer />
        </MapWrapper>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getFetching(state),
  error: getError(state),
  isMapLoading: isMapLoading(state),
  isGetRoute: isGetRoute(state)
});
export default connect(mapStateToProps, null)(App);
