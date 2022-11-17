import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
export const Wrapper = styled.div`
  width: 100%;
  margin: 30px auto;
  color: #a8071a;
`;

export const Title = styled.h1`
  max-width: 100%;
  width: 100%;
  margin: 0 left;
  font-size: 60px;
  border-radius: 5px;
  font-weight: 700;
  text-align: center;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  padding: 15px 0px 0px 0px;
  box-shadow: 0 0 12px rgb(0 0 0 / 10%);
  color: "#cf1322";
`;
export const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  background-color: whitesmoke;
`;
export const ContentImg = styled.img`
    width: 100%;
    background-repeat: no-repeat;
    object-fit: cover;
    height: 600px;
    padding: 10px;
    border-radius: 20px;
    background-position: center;
b
`;
