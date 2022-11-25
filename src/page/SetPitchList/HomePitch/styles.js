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
export const TitleContent = styled.div`
  margin-top: 24px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 24px;

  & > svg {
    font-size: 40px;
    color: #1c6cc1;
  }
  & > h1 {
    padding-left: 14px;
    margin-bottom: 0;
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
  font-size: 28px;
  display: flex;
  flex-direction: column;
  color: #cf1322;
  background-color: #ebebeb;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
`;
export const ItemImagePitch = styled.img`
  object-fit: cover;
  height: 150px;
  border-radius: 6px;
  width: 150px;
`;
export const ItemWrapperPitch = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
`;
export const ItemRowWrapper = styled(Row)`
  padding: 16px;
`;
export const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
  border-radius: 8px;
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
  width: 100%;
`;
export const WrapperCard = styled(Card)`
  margin: 16px 0 32px 0;
  word-wrap: break-word;
  background-color: #e5e5e5;
`;
export const WrapperContent = styled.div`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;

  & h2 {
    font-size: 20px;
    color: "#a8071a";
    font-weight: 600;
    margin-bottom: 0;
    width: 120px;
  }
`;
export const FilterWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  background-color: white;

  & h2 {
    font-size: 20px;
    color: "#a8071a";
    font-weight: 600;
    margin-bottom: 0;
  }
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
  font-size: 32px;
`;
export const ColIcon = styled(Col)`
  display: flex;
  height: auto;
  border-bottom: 1px outset;
  margin: 5px;
  justify-content: space-evenly;
  align-content: center;
  align-items: stretch;
`;
