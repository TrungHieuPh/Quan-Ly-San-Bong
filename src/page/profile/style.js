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
  align-items: baseline;
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
  margin: 16px;
  padding: 16px;
  text-align: center;
  border-radius: 5px;
`;
export const ContentTopItem = styled.h1`
  height: auto;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  border-radius: 5px;
  color: #a8071a;
  width: max-content;
`;
export const ContentTopTitle = styled.h1`
  display: flex;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 8px;
  background-color: whitesmoke;
  margin: 0px 0px 10px -40px;
  padding: 20px;
  width: max-content;
  text-align: center;
  border-radius: 3px;
  color: ##a8071a;
  position: relative;
  bottom: 30px;
  font-weight: 900;
`;
export const ButtonUpdateInfo = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  height: 0;
  & :hover {
    & :after {
      left: 0;
      width: 100%;
    }
  }
  & :after {
    position: absolute;
    content: "";
    bottom: -9px;
    left: 50%;
    right: 10px;
    width: 0;
    height: 3px;
    background-color: #1890ff;
    transition: all 0.3s ease;
  }
  & Button {
    font-size: 20px;
  }
`;
/* .select {
  padding: 0;
  display: flex;
  width: 100%;
}

.select li::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 50%;
  right: 0;
  width: 0;
  height: 3px;
  background-color: #1890ff;
  transition: all 0.3s ease;
}

.select li:hover:after {
  left: 0;
  width: 100%;
} */
