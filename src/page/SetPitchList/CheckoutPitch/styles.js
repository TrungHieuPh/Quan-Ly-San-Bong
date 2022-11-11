import styled from "styled-components";
import { Form } from "antd";

export const Wrapper = styled.div`
  padding: 50px 50px;
  background-color: white;
  border-radius: 5px;
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
  width: 40%;
  border: 1px solid white;
  background-color: white;
`;
export const ItemArbitration = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 0px;
  padding: 10px;
`;
export const ItemCombo = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 0px 0px;
  padding: 13px;
`;
export const ItemReceipt = styled.div`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 0px 0px;
  padding: 13px;
`;
export const ItemTitle = styled.h2`
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin: 15px 0px 0px 0px;
  padding: 13px;
  width: max-content;
  display: inline-table;
`;
export const ItemTitleInfo = styled.h2`
  font-size: 30px;
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
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
  box-shadow: rgb(0 0 0 / 50%) -1px 1px 7px;
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
