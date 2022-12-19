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
