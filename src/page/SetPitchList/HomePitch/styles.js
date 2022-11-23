import styled from "styled-components";
import { Link } from "react-router-dom";
import { Col, Row, Select, Card } from "antd";

export const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 310px);
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
  align-items: stretch;
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
export const ItemPrice = styled.div`
  font-size: 40px;
  display: flex;
  flex-direction: column;
  color: #cf1322;
  box-shadow: rgb(0 0 0 / 50%) -1px 0px 3px;
  background-color: whitesmoke;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
`;
export const ItemImagePitch = styled.img`
  object-fit: cover;
  height: 150px;
  border-radius: 6px;
  width: 150px;
`;
export const ItemWrapperPitch = styled(Col)`
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid white;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  border-radius: 7px;
`;
export const ItemRowWrapper = styled(Row)`
  padding: 16px;
`;
export const ItemImage = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  margin: 16px;
  border-radius: 6px;
`;
export const WrapperCol2Filter = styled(Col)`
  border: 1px solid white;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  border-radius: 5px;
  padding: 25px 10px 20px 10px;

  margin: 0px 0px 65px 0px;
`;
export const WrapperCol1 = styled(Col)`
  border: 1px solid white;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  border-radius: 5px;
  padding: 15px 35px;
`;
export const WrapperRow1 = styled(Row)`
  margin-bottom: 16px;
  padding: 16px;
`;
export const SelectPriceFilter = styled(Select)`
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  margin: 0px 0px 10px 0px;
  width: 100%;
  border-radius: 5px;
`;
export const WrapperCard = styled(Card)`
  margin: 16px 0 32px 0;
  word-wrap: break-word;
  background-color: #e5e5e5;
`;
export const WrapperContent = styled(Row)`
  padding: 10px;
  border: 1px solid white;
  margin: 0 auto;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  align-items: baseline;
  justify-content: space-between;
  align-content: center;
  border-radius: 5px;
`;
export const WrapperPriceAndTimes = styled(Row)`
  padding: 10px;
`;
export const itemPricePitch = styled.div`
  display: flex;
  align-items: center;
  font-weight: 900;
  margin: 0 auto;
  width: max-content;
`;
export const ColIcon = styled(Col)`
  display: flex;
  height: auto;
  border: 1px outset;
  margin: 5px;
  justify-content: space-evenly;
  align-content: center;
  align-items: stretch;
`;
