import React, { useState, useMemo } from "react";
import { Button, Steps, Table, InputNumber } from "antd";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../../redux/actions";

import TimeSelect from "./Components/TimeSelect";
import Info from "./Components/Info";
import Payment from "./Components/Payment";
import Success from "./Components/Success";
import * as S from "./styles";

const CheckoutPage = () => {
  const [step, setStep] = useState(0);

  const renderCheckoutContent = useMemo(() => {
    switch (step) {
      case 1: {
        return <Info setStep={setStep} />;
      }
      case 2: {
        return <Payment setStep={setStep} />;
      }
      case 3: {
        return <Success setStep={setStep} />;
      }
      case 0:
      default: {
        return <TimeSelect setStep={setStep} />;
      }
    }
  }, [step]);

  return (
    <S.Wrapper>
      <Steps
        current={step}
        style={{
          boxShadow: "rgb(0 0 0 / 50%) 0px 0px 5px",
          padding: "15px 20px 15px 20px",
          backgroundColor: " whitesmoke",
          borderRadius: 5,
        }}
      >
        <Steps.Step title="Chọn thời gian" />
        <Steps.Step title="Info" />
        <Steps.Step title="Payment" />
        <Steps.Step title="Success" />
      </Steps>

      {renderCheckoutContent}
    </S.Wrapper>
  );
};

export default CheckoutPage;
