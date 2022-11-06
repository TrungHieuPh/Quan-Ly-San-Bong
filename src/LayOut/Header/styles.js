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
export const TopWrapper = styled.div`
  max-width: 100%;
  height: 55px;
  position: sticky;
  top: 0;
  background-color: #820014;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding-right: 40px;
  padding-left: 40px;
`;
export const Logos = styled.h2`
  font-family: "font-sh-imogen-agnes";
`;
