import styled, { css } from "styled-components";
import { FaBars } from "react-icons/fa";
import { Button } from "antd";

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
  padding: 0 24px;
  height: 56px;
  top: 0;
  width: 100%;
  position: sticky;
  background-color: #e5e5e5;
  z-index: 10;
  width: 100%;
  & > h2 & h4 {
    color: white;
  }
`;

export const Logos = styled.h2`
  font-family: "font-sh-imogen-agnes";
`;
export const ContainerWrapper = styled.header`
  width: 100%;
  background-color: #00474f;
  top: 0;
  position: sticky;
  z-index: 99;
  box-shadow: rgb(0 0 0 / 60%) 0px 4px 5px;

  /*  @media screen and (max-width: 768px) {
  }
  & .nav-btn {
    padding: 5px;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    color: var(--textColor);
    visibility: hidden;
    opacity: 0;
    font-size: 1.8rem;
  } */
`;
/* export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const ButtonNav = styled(Button)`
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: var(--textColor);
  visibility: hidden;
  opacity: 0;
  font-size: 1.8rem;
  @media screen and (max-width: 768px) {
    visibility: visible;
    opacity: 1;
  }
`;
export const responsive_nav = styled.div`
  transform: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
  & .expanded {
    display: block;
  }
`;
 */
