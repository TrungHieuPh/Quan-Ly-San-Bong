import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  min-height: calc(100vh - 263px);
  width: 1265px;
  margin: 0 auto;
`;
export const Container = styled.div`
  background-color: #e5e5e5;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  background-image: url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=5000&q=200");
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
