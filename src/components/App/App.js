import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Loader from "react-svg-spinner";

import List from "../List/List";
import Area from "../Area/Area";
import ErrorBox from "../ErrorBox/ErrorBox";
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
  max-width: 800px;
  min-height: 500px;
  position: relative;

  &,
  & * {
    box-sizing: border-box;
  }
`;

const ListWrapper = styled.div`
  width: 40%;
  border-right: 1px solid #f0f0f0;
  padding: 20px;
`;

const MapWrapper = styled.div`
  width: 60%;
  position: relative;
  display: flex;
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
`;

const LoaderContainder = props => (
  <LoaderWrapp>
    <div className="loader">
      <Loader size="70px" gap={4} color="#cccccc" />
      <div className="loading-title">{props.text}</div>
    </div>
  </LoaderWrapp>
);

class App extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <AppWrapper>
        {this.props.isMapLoading && <LoaderContainder text="Загрузка карты" />}
        <ListWrapper>
          <Area />
          <List />
          {this.props.isFething && <Loader size="20px" gap={4} color="green" />}
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
