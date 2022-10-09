import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderLogo = styled.h1`
  left: 50%;
  position: absolute;
  /*   top: 50%; */
  transform: translate(-50%, -50%);
  width: 14.6354166667vw;
  z-index: 2;
  text-align: center;
`;
export const topBar = styled.div`
  height: 4.4791666667vw;
  position: relative;
`;
export const HeaderContainer = styled.header`
  justify-content: space-around;
  align-items: center;
  text-align: center;
  /*  padding: 0 24px; */
  height: 56px;
  max-width: 100% !important;
`;
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;
export const HeaderItem = styled(Link)`
  color: #fff;
  display: inline-block;
  font-family: Roboto Condensed, sans-serif;
  font-size: 1.0416666667vw;
  font-weight: 300;
  margin-right: 8.0729166667vw;
  margin-top: 0.2604166667vw;
  padding: 1.0416666667vw 0;
  text-transform: uppercase;
  transition: font-weight 0.3s ease;
`;
/* &::after {
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
`; */
export const WrapperHeader = styled.div`
  position: relative;
  z-index: 50;
`;
export const header = styled.div`
  background: url("https://cdn.vn.garenanow.com/web/fo4/scloud/static/qhn/fo4_vfgdau/asset/images/header-bg_20851f49b1a4bfb9b8ef44aa4eb9c73c.png")
    no-repeat;
  background-size: 100% 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
`;
export const textCenter = styled.div`
  position: relative;
  z-index: 50;
`;
