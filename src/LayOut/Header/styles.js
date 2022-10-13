import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: #d4380d;
  z-index: 10;
  & h2 {
    color: white;
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderAccount = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled.div`
  width: 1165px;
  height: 60px;
  padding: 10px;
  font-size: 20px;
  margin: 0 auto;
`;
export const Header = styled.div`
  .header {
    width: 100%;
    height: 60px;
    margin: 0 auto;
  }
`;
export const UseNav = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 15px;
  color: #e84749;
`;
