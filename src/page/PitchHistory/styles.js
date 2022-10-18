import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1250px;
  margin: 0 auto;
  min-height: calc(100vh -309px);
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
  & > Button {
    font-size: 27px;
    color: black;
    font-weight: 600;
  }
`;
