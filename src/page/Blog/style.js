import styled from "styled-components";
import { Form } from "antd";

export const Wrapper = styled.div`
  background-color: #ddd;
  margin: 16px;
  padding: 16px;
  height: auto;
  width: 100%;
`;
export const TopWrapper = styled.div`
  display: flex;
  justify-content: Space-between;
  align-items: center;
  height: auto;
  width: 100%;
`;
export const Content = styled(Form)`
  background-color: white;
`;
export const ItemImage = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 8px;
`;
export const BlogList = styled.div`
  display: flex;
  justify-content: Space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid white;
`;
export const BlogListTitle = styled.div`
  display: flex;
`;
export const sub = styled.div`
  display: flex;
`;
export const icon = styled.div`
  display: flex;
  font-size: 10px;
  color: #a8071a;
`;
