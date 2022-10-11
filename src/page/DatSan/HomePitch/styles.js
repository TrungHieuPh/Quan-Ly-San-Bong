import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 45px;
  max-width: 1250px;
  left: 115px;
  position: relative;
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
