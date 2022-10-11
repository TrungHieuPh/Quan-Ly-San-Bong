import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 45px;
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
  margin-bottom: 18px;
  color: #000;
  text-decoration: none;
  font-size: 21px;
  margin-left: -11px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);
  padding: 5px;
  width: 200%;
  text-align: center;
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
  width: 1%;
  white-space: nowrap;
  padding: 17px 12px 12px 0;
  border-bottom: solid 1px #ddd;
  vertical-align: top;
  font-size: 33px;
  display: inline-flex;
  font-weight: bold;
  text-align: left;
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
`;

export const Center = styled.div`
  float: right;
  width: 568px;
`;
/* left */
export const Left = styled.div`
  margin-right: 36px;
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
