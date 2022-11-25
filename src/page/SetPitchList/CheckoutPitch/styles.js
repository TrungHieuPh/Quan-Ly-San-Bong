import styled from "styled-components";
import { Form, Radio } from "antd";

export const Wrapper = styled.div`
  margin-top: 24px;
  padding: 24px;
  background-color: white;
  border-radius: 5px;
  width: 100%;
`;

export const ProductContent = styled.div`
  & img {
    width: 100%;
    height: auto;
  }
`;

export const CustomForm = styled(Form)`
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;
export const WrapperLeft = styled.div`
  padding: 10px;
  background-color: white;
`;
export const ItemArbitration = styled.div`
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 0px;
  padding: 10px;
`;
export const ItemCombo = styled.div`
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 0px 0px;
  padding: 13px;
`;
export const ItemReceipt = styled.div`
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 16px;
`;
export const ItemTitle = styled.h2`
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 0px 0px;
  padding: 13px;
  width: max-content;
  display: inline-table;
`;
export const ItemTitleTimeSelect = styled.h2`
  color: white;
  margin-bottom: 16px;
  font-weight: 500;
`;
export const ItemTitleInfo = styled.h2`
  font-size: 30px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 10px -20px;
  padding: 5px 15px 5px 15px;
  width: max-content;
  display: inline-table;
  position: relative;
  top: 25px;
  z-index: 99;
  border: 20px solid white;
  color: white;
  background-color: #f5222d;
`;
export const ItemTitlePayment = styled.h2`
  font-size: 30px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 10px -20px;
  padding: 5px 15px 5px 15px;
  width: max-content;
  display: inline-table;
  position: relative;
  top: 25px;
  z-index: 99;
  border: 20px solid white;
  color: white;
  background-color: #f5222d;
`;
export const ItemImagePayment = styled.img`
  height: 35px;
  width: 80px;
  object-fit: cover;
`;
export const ItemRadioBank = styled(Radio)`
  border: 1px solid rgb(204, 204, 204);
  padding: 5px;
  margin: 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  height: 65px;
  cursor: pointer;
  width: max-content;
`;
export const div1 = styled.div`
  border-radius: 8px;
  padding: 16px;
  background-color: #425b76;
  text-align: center;
`;
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > h1 {
    padding-left: 14px;
    margin-bottom: 0;
  }
`;
