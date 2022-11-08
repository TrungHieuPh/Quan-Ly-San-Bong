import styled from "styled-components";
import { Form, Button } from "antd";

export const Wrapper = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  position: relative;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const FormWrapper = styled.div`
  margin-top: 16px;
`;
export const BgTitle = styled.div`
  display: inline-block;
  margin-bottom: 0px;
  color: #000;
  -webkit-text-decoration: none;
  text-decoration: none;
  /* font-size: 23px; */

  border: 1px solid #ddd;
  box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);
  padding: 5px;
  width: 100%;
  text-align: center;
  background: url(https://labola.jp/labostatic/img/cover/banner_top.png);
  height: 300px;
  background-size: cover;
`;
export const Items = styled.div`
  display: flex;
  border-bottom: 0.5px solid #ddd;
`;
export const Details = styled.table`
  margin: 0 0 24px;
  word-wrap: break-word;
  line-height: 1.5;
`;
export const DetailsTBody = styled.tbody`
  margin: 0 0 24px;
  border-top: 1px solid #ddd;
  line-height: 1.5;
`;
export const DetailsTr = styled.tr`
  margin: 0 0 24px;
  line-height: 1.5;
  border-bottom: 0.5px solid #ddd;
`;
export const DetailsTh = styled.th`
  width: 1%;
  white-space: nowrap;
  padding: 17px 12px 12px 0;
  border-bottom: solid 1px #ddd;
  vertical-align: top;
  font-size: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
`;
export const DetailsThs = styled.th`
  white-space: nowrap;
  vertical-align: top;
  color: #f5222d;
  font-size: 60px;
  display: inline-flex;
  font-weight: bold;
  text-align: left;
  padding: 25px 10px 40px 10px;
  margin: 16px;
  background-color: whitesmoke;
  border-radius: 7px;
  box-shadow: rgb(0 0 0 / 60%) 0px 3px 5px;

  & img {
    height: 50px;
    width: 50px;
  }
`;
export const DetailsTd = styled.td`
  padding: 12px 0;
  border-bottom: solid 1px #ddd;
  font-size: 16px;
  line-height: 1.57;
  max-width: 45ch;
`;
export const Main = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const Center = styled.div`
  float: right;
  width: 110%;
`;
/* left */
export const Left = styled.div`
  margin-right: 36px;
  width: 20%;
`;
export const SideProfile = styled.section`
  margin: 0 0 12px;
  border: solid 1px #ddd;
  background: #fff;
  box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);
  & > .main {
    padding: 18px;
    text-align: center;
    font-size: 11px;
    font-size: 1.1rem;
    color: #333;
  }
  & > .sub {
    padding: 6px;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    background: #f6f6f6;
    font-size: 10px;
    font-size: 1rem;
    color: #666;
    text-align: center;
    & > span {
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
  & > ul {
    display: table;
    width: 100%;
    white-space: nowrap;
    position: relative;
    top: 10px;
    right: 20px;

    & > li {
      display: table-cell;
      width: 33.3333%;
      padding: 5px 10px;
      font-size: 17px;

      font-weight: bold;
      color: #888;
      line-height: 1.2;
      text-align: center;
    }
    & > .good {
      color: #4ba66f;
      position: relative;
      right: 5px;
      & > span {
        position: relative;
        top: -2px;
        left: 2px;
      }
    }
    & > .meh {
      border-left: solid 1px #ddd;
      color: #f5a623;
      & > span {
        top: -2px;
        position: relative;
        left: 2px;
      }
    }
    & > .bad {
      border-left: solid 1px #ddd;
      & > span {
        top: -2px;
        position: relative;
        left: 2px;
      }
    }
  }
`;
export const LeftMenu = styled.section`
  display: block;
  & > .arrows {
    margin: 0 0 12px;
    border: solid 1px #ddd;
    background: #fff;
    box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);
    & > li {
      position: relative;
      right: 22px;
      text-align: center;
    }
  }

  & > ul > li {
    position: relative;
    right: 41px;
    text-align: center;

    & > a {
      display: block;
      padding: 12px;
      font-size: 17px;
      color: #333;
      line-height: 1.1;
      text-decoration: none;
      & > svg {
        top: 2px;
        position: relative;
        right: 13px;
      }
    }
  }
  & > .arrowsbot {
    width: 213px;
    margin: 0 0 12px;
    border: solid 1px #ddd;
    background: #fff;
    box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);
    & > li {
      border-top: solid 1px #ddd;
      width: 213px;
      & > .selected {
        color: #1c6cc1;
      }
      & > a {
      }
    }
    & > li :hover {
      background-color: #f6f6f6;
    }
  }
`;
export const RightMenu = styled.section`
  position: relative;

  top: 130px;
  left: 150px;
`;
export const ProductContent = styled.div`
  padding: 16px;

  & img {
    width: 100%;
    height: auto;
  }
`;
export const CartContainer = styled.div`
  margin: 16px auto;
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;

  h3 {
    margin-bottom: 0;
  }
`;
export const CustomForm = styled(Form)`
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;
export const ButtonSetPitch = styled(Button)`
  font-weight: 600;
  padding: 10px;
  margin: 10px;
  height: max-content;
  border-radius: 5px;
  & > :hover {
    background-color: red;
  }
`;
export const ButtonSetPitchHover = styled.div`
  /*   & :hover {
    background-color: red;
  } */
`;
export const SearchBooking = styled.div`
  display: flex;
  position: relative;
  bottom: 20px;
  border: "1px solid #ddd";
  justify-content: space-around;
  align-items: center;
  height: 140px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0px 1px 1px;
  border-radius: 5px;
`;
export const SearchItem = styled.div`
  border-right: "1px solid #ddd";
  text-align: center;
  padding: "0px 10px";
  display: " inherit";
  flex-direction: column;
  align-items: center;
  width: 18%;
`;
export const WrapperContent = styled.div`
  border: 1px solid white;
  background-color: white;
  border-radius: 7px;
`;
export const ContentLeft = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin: 8px;
  padding: 16px;
  background-color: whitesmoke;
  box-shadow: rgb(0 0 0 / 60%) 0px 3px 5px;
`;
export const ContentRight = styled.div`
  background-color: whitesmoke;
  text-align: center;
  width: 45%;
  padding: 16px;
  margin: 8px;
  box-shadow: rgb(0 0 0 / 60%) 0px 3px 5px;
  height: max-content;
  border-radius: 15px;
`;
export const WrapperReview = styled.div`
  margin-top: 30px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 3px;
  padding: 16px;
  border-radius: 10px;
`;
export const priceFrom = styled.div`
  display: flex;
  font-size: 35px;
  padding: 0px 10px;
  border: 5px solid whitesmoke;
  background-color: white;
  height: 125px;
  width: 350px;
  box-shadow: rgb(0 0 0 / 60%) 0px 3px 5px;
  align-items: flex-start;
  flex-direction: column;
`;
