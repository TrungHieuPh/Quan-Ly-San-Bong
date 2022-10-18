import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  min-height: calc(100vh - 263px);
  max-width: 1165px;
  margin: 0 auto;
`;
export const Container = styled.div`
  background: -webkit-linear-gradient(to bottom, #f0efec, #fff);
  background: -o-linear-gradient(to bottom, #f0efec, #fff);
  background: -moz-linear-gradient(to bottom, #f0efec, #fff);
  /* background: linear-gradient(to bottom,#f0efec,#fff); */
  background-size: 100% 300px;
  background-repeat: no-repeat;
  background-position: top center;
  max-width: 3000px;
  min-height: 100%;
`;
export const Header = styled.div`
  color: #fff;
  padding: 0 12px;
  position: absolute;
  top: 15px;
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

export const Line = styled.div`
  border-bottom: 3px solid rgb(221, 221, 221);
  margin: 30px 0px;
`;
/*  */
export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
