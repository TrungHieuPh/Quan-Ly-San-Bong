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
