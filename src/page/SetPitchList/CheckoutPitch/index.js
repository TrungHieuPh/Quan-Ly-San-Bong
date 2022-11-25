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
      <S.TitleContent>
        <h1
          style={{
            color: " #a8071a",
            fontFamily: "monospace",
            fontSize: 36,
          }}
        >
          Đặt sân
        </h1>
      </S.TitleContent>
      <Steps
        current={step}
        style={{
          padding: 16,
          backgroundColor: " whitesmoke",
          borderRadius: 8,
        }}
      >
        <Steps.Step title="Chọn thời gian" />
        <Steps.Step title="Thông tin" />
        <Steps.Step title="Thanh toán" />
        <Steps.Step title="Hoàn thành" />
      </Steps>

      {renderCheckoutContent}
    </S.Wrapper>
  );
};

export default CheckoutPage;
