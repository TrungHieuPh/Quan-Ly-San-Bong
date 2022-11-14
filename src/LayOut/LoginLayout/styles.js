import styled from "styled-components";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: calc(100vh - 156px);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin-left: ${({ isShowSidebar }) => (isShowSidebar ? "200px" : "0")};
  transition: 0.3s all;
`;
export const MainContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  flex: 1;
  width: 100%;
  /*  float: left;
  transform: scale(1.5); */
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  margin: 0 auto;
  background-image: url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=5000&q=200");
`;
