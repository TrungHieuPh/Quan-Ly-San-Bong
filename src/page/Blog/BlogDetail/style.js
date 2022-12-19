import styled from "styled-components";
import { Form, Card } from "antd";
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
export const TitleBlog = styled.h1`
  font-size: 40px;
  font-weight: 900;
  margin: 0 auto;
`;
export const Author = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 50px;
  font-weight: 900;
`;
export const flowerBlog = styled.div`
  /*  display: flex;
  align-items: flex-start;
  margin-bottom: 50px;
  font-weight: 900; */
`;
export const SearchBooking = styled.div`
  width: 100%;
  padding: 16px;
  /*   background-color: white;
 */
  border-radius: 8px;
`;
export const DetailsThs = styled.div`
  text-align: center;
  color: #a8071a;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & img {
    height: 50px;
    width: 50px;
  }
  & div {
    font-weight: bold;
    color: #a8071a;
    font-size: 36px;
  }
`;
export const WrapperWriteComment = styled(Card)`
  width: 100%;
  margin-top: 16px;
  background-color: whitesmoke;
  border-radius: 8px;
`;
export const CustomForm = styled(Form)`
  & Button {
    background: #003a8c;
  }
`;
