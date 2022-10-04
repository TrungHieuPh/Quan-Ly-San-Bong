import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderLogo = styled.h1`
  background-color: #597ef7;
  color: white;
  padding: 0;
  margin: 0;
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  /*  padding: 0 24px; */
  height: 56px;
`;
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
`;
export const HeaderItem = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 16px;
  color: black;
  cursor: pointer;

  &::after {
    background: #1c6cc1;
    height: 2px;
    opacity: 1;
    width: 100%;
    left: 0;
  }
  &:hover {
    color: #1c6cc1;
  }

  ${(props) =>
    props.active &&
    css`
      border-left: 1px solid #597ef7;
      border-right: 1px solid #597ef7;
      left: 0;
      opacity: 1;
      color: #1c6cc1;
    `}
`;
export const WrapperHeader = styled.div`
  position: relative;
  z-index: 50;
`;
