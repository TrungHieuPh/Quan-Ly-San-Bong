import styled from "styled-components";
import { Link } from "react-router-dom";
import { Col } from "antd";

export const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 310px);
  background-color: #fbcec978;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 16px;
  background-image: url("https://labola.jp/labostatic/img/cover/banner_soccer.png");
  background-size: cover;
  height: 225px;
  background-repeat: no-repeat;
`;

export const ListWrapper = styled.div`
  margin-top: 16px;
`;
export const TitleContent = styled(Col)`
  margin-top: 16px;
  display: flex;
  & > svg {
    font-size: 40px;
    color: #1c6cc1;
  }
  & > h1 {
    padding-left: 14px;
  }
  & > Button {
    position: relative;
    top: 9px;
    left: 700px;
  }
`;
export const TitleItem = styled.div`
  display: flex;
  align-items: baseline;
  & > Button {
    font-size: 27px;
    color: black;
    font-weight: 600;
    top: -10px;
    position: relative;
    right: 15px;
  }
`;
export const FilterContainer = styled.div`
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
`;
export const ItemPrice = styled.h2`
  width: max-content;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #cf1322;
  box-shadow: rgb(0 0 0 / 50%) -1px 0px 3px;
  background-color: whitesmoke;
  border-radius: 3px;
  padding: 5px;
`;
