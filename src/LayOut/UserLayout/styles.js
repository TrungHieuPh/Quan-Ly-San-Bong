import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  display: flex;
  padding-bottom: 64px;
`;
export const MainContainer = styled.div`
  position: relative;
  /*  display: flex; */
  flex: 1;
  width: 100%;
  /*  float: left;
  transform: scale(1.5); */
  margin: 0 auto;
  background-image: url("https://vanhoahoc.vn/wp-content/uploads/hinh-nen-bong-da.jpg?w=2000");
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
