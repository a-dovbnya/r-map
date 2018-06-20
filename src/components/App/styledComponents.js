import styled from "styled-components";

export const AppWrapper = styled.div`
  margin: 100px auto;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  min-height: 500px;
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.05);

  &,
  & * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 650px) {
    border: none;
    align-items: flex-start;
  }
`;

export const ListWrapper = styled.div`
  width: 40%;
  border-right: 1px solid #f0f0f0;
  padding: 20px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const MapWrapper = styled.div`
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

export const LoaderWrapp = styled.div`
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

export const AreaWrapper = styled.div`
  position: relative;

  [data-name="listLoader"] {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 10px;
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 20px;
  background: #f0f0f0;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(244, 54, 76, 0.8);
`;
