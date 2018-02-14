import React, { PureComponent } from 'react';
import styled from 'styled-components';

import List from '../List/List';
import Area from '../Area/Area';
import ErrorBox from '../ErrorBox/ErrorBox';
import MapContainer from '../Map/Map';


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
    return (
      <AppWrapper>
        <ListWrapper>
          <Area />
          <List />
          <ErrorBox />
        </ListWrapper>
        <MapContainer/>
      </AppWrapper>
    );
  }
}

export default App;