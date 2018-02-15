import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Loader from 'react-svg-spinner';

import List from '../List/List';
import Area from '../Area/Area';
import ErrorBox from '../ErrorBox/ErrorBox';
import MapContainer from '../Map/Map';

import {getError, getFetching} from '../../reducers';


const AppWrapper = styled.div`
  margin: 100px auto;
  border: 1px solid #f0f0f0;
  display: flex;
  max-width: 800px;
  min-height: 500px;
  
  &, & *{
      box-sizing: border-box;
  }
`;

const ListWrapper = styled.div`
  width: 40%;
  border-right: 1px solid #f0f0f0;
  padding: 20px;
`;

class App extends PureComponent {

  render() {
    console.log(this.props);
    return (
      <AppWrapper>
        <ListWrapper>
          <Area />
          <List />
          <Loader size="20px" gap={4} color="green"/>
          { this.props.isFetching && <Loader size="20px" gap={4} color="green"/> }
          { this.props.error.length > 0 && <ErrorBox error={this.props.error}/>}
        </ListWrapper>
        <MapContainer/>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getFetching(state),
  error: getError(state)
});
export default connect(mapStateToProps, null)(App);