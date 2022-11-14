import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
export const WrapperProfile = styled.div`
  width: 1250px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
`;
export const ContainerProfile = styled.div`
  display: flex;
  margin: 0 auto;
  box-shadow: 0 3px 6px 10px rgba(0, 0, 0, 0.03);
`;
export const LeftProfile = styled.div`
  background-color: #0050b3;
`;
export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: auto;
  background-color: #0050b3;
  color: white;
`;
export const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #096dd9;
    color: white;
  }
  & > svg {
    font-size: 25px;
  }
  ${(props) =>
    props.active &&
    css`
      border-right: 5px solid #00474f;
      background-color: #08979c;
    `}
`;
export const RightContainer = styled.div`
  padding: 16px;
  width: calc(100% - 250px);
`;
export const Image = styled.div`
  width: 100%;
  height: 100px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ItemText = styled.h2`
  display: flex;
  align-items: center;
`;
export const WrapperContainer = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: white;
  height: max-content;
  margin: 50px;
  width: 100%;
`;
export const ContentBottom = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: whitesmoke;
  margin: 16px;
  padding: 16px;
  border-radius: 5px;
`;
export const ContentTop = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: whitesmoke;
  margin: 16px;
  padding: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
`;
export const ContentTopItem = styled.h1`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: whitesmoke;
  margin: 16px;
  padding: 16px;
  text-align: center;
  width: max-content;
  text-align: center;
  border-radius: 5px;
  color: #1890ff;
`;
export const ContentTopTitle = styled.h1`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: whitesmoke;
  margin: 0px 0px 10px -40px;
  padding: 20px;
  width: max-content;
  text-align: center;
  border-radius: 3px;
  color: #1890ff;
  position: relative;
  bottom: 30px;
`;
