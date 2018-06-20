import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Loader from "react-svg-spinner";

import List from "../List/List";
import Area from "../Area/Area";
import MapContainer from "../Map/Map";

import {
  AppWrapper,
  ListWrapper,
  MapWrapper,
  LoaderWrapp,
  AreaWrapper,
  ErrorContainer
} from "./styledComponents";

import {
  getError,
  getFetching,
  isMapLoading,
  isGetRoute
} from "../../reducers";

const LoaderContainder = props => (
  <LoaderWrapp>
    <div className="loader">
      <Loader
        size="70px"
        gap={4}
        color="rgba(23, 29, 230, 0.4)"
        thickness={2}
      />
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
                color="rgba(23, 29, 230, 0.8)"
                thickness={2}
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
export default connect(
  mapStateToProps,
  null
)(App);
