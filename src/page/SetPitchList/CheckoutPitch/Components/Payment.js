import { useState, useMemo } from "react";

import { Row, Button, Card, Radio, Col, Input, Form, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { bookingPitchAction } from "../../../../redux/actions";
import * as S from "../styles";

import ACB from "../../../../Images/bank/ACB.jpg";
import BIDV from "../../../../Images/bank/BIDV.jpg";
import DAB from "../../../../Images/bank/DAB.jpg";
import MB from "../../../../Images/bank/MB.jpg";
import SCB from "../../../../Images/bank/SCB.png";
import saccombank from "../../../../Images/bank/saccombank.png";
import TCB from "../../../../Images/bank/TCB.jpg";
import VCB from "../../../../Images/bank/VCB.jpg";
import viettinbank from "../../../../Images/bank/viettinbank.png";

const Payment = ({ setStep }) => {
  /*   const [selectBank, setSelectBank] = useState(); */
  const { checkoutInfo, CheckoutTimeSelect } = useSelector(
    (state) => state.checkout
  );

  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const { pitchDetail } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [paymentForm] = Form.useForm();
  const handleSubmitPaymentForm = (values) => {
    dispatch(
      bookingPitchAction({
        ...values,
        ...checkoutInfo,
        userId: userInfo.data.id,
        date: CheckoutTimeSelect.date,
        status: CheckoutTimeSelect.status,
        timeOption: CheckoutTimeSelect.timeoption,
        totalPrice: CheckoutTimeSelect.totalPrice,
        pitchId: parseInt(id),
        pitchName: pitchDetail.data.name,
        arbitrationName:
          CheckoutTimeSelect.pitchBonus?.arbitrationSelect.name || "Không có",
        comboName: CheckoutTimeSelect.pitchBonus.comboSelect.name || "Không có",
      })
    );
    setStep(3);
  };

  return (
    <>
      <S.ItemTitlePayment>Thanh toán</S.ItemTitlePayment>
      <Form
        layout="vertical"
        name="paymentForm"
        form={paymentForm}
        onFinish={(values) => handleSubmitPaymentForm(values)}
      >
        <Card
          size="small"
          style={{
            boxShadow: " rgb(0 0 0 / 50%) -1px 1px 7px",
            backgroundColor: "whitesmoke",
            borderRadius: 5,
            margin: 0,
            padding: 10,
          }}
        >
          <Form.Item
            label="Phương thức thanh toán"
            name="method"
            rules={[
              {
                required: true,
                message: "Chọn phương thức thanh toán!",
              },
            ]}
          >
            <Radio.Group
              buttonStyle="solid"
              style={{ margin: 16, width: "100%" }}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Radio value="cod">Thanh toán trả sau</Radio>
                </Col>
                <Col span={8}>
                  <Radio value="visa">Thanh toán bằng thẻ Visa</Radio>
                </Col>
                <Col span={8}>
                  <Radio value="atm">Thanh toán bằng thẻ ATM</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "visa" && (
              <Card
                size="small"
                style={{
                  boxShadow: " rgb(0 0 0 / 50%) -1px 1px 7px",
                  backgroundColor: "whitesmoke",
                  borderRadius: 5,
                  margin: 8,
                  padding: 8,
                }}
              >
                <Form.Item
                  label="Số thẻ:"
                  name="cardnumber"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                    {
                      pattern:
                        /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/,
                      message: "Nhập số thẻ chưa đúng",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tên in trên thẻ:"
                  name="cardname"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ngày hết hạn:"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                    /*   {
                      pattern:
                        /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})/,
                      message: "Nhập số thẻ chưa đúng",
                    }, */
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Mã bảo mật:"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "atm" && (
              <Card
                size="small"
                style={{
                  boxShadow: " rgb(0 0 0 / 50%) -1px 1px 7px",
                  backgroundColor: "whitesmoke",
                  borderRadius: 5,
                  margin: 8,
                  padding: 8,
                }}
              >
                <Form.Item
                  label="Số thẻ:"
                  name="cardnumber"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung thẻ!",
                    },
                    {
                      pattern:
                        /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/,
                      message: "Nhập số thẻ chưa đúng",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ngân hàng:"
                  name="bank"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                  ]}
                >
                  <Radio.Group
                  /*  onChange={(e) => setSelectBank(e.target.value)}
                    defaultValue={selectBank} */
                  >
                    <Row>
                      <Col span={8}>
                        <Radio
                          value="VCB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            margin: 10,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={VCB} alt="" />
                        </Radio>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="VTB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            margin: 10,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment
                            src={viettinbank}
                          ></S.ItemImagePayment>
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="SCB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={SCB}></S.ItemImagePayment>
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="BIDV"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={BIDV} />
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="saccombank"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={saccombank} />
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="DAB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={DAB} />
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="ACB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={ACB} />
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="MB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={MB} />
                        </S.ItemRadioBank>
                      </Col>
                      <Col span={8}>
                        <S.ItemRadioBank
                          value="TCB"
                          style={{
                            border: " 1px solid rgb(204, 204, 204)",
                            padding: 5,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            height: 65,
                            cursor: "pointer",
                            width: "max-content",
                          }}
                        >
                          <S.ItemImagePayment src={TCB} />
                        </S.ItemRadioBank>
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.method !== currentValues.method
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("method") === "TCB" && (
                              <Card
                                size="small"
                                style={{
                                  boxShadow: " rgb(0 0 0 / 50%) -1px 1px 7px",
                                  backgroundColor: "whitesmoke",
                                  borderRadius: 5,
                                  margin: 8,
                                  padding: 8,
                                }}
                              >
                                <Form.Item
                                  label="Số thẻ:"
                                  name="cardnumber"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Bạn chưa nhập nội dung.!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Tên in trên thẻ:"
                                  name="cardname"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Bạn chưa nhập nội dung.!",
                                    },
                                    {},
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Ngày hết hạn:"
                                  name="date"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Bạn chưa nhập nội dung.!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Mã bảo mật:"
                                  name="code"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Bạn chưa nhập nội dung.!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Card>
                            )
                          }
                        </Form.Item>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.method !== currentValues.method
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("method") === "visa" && (
                      <Card
                        size="small"
                        style={{
                          boxShadow: " rgb(0 0 0 / 50%) -1px 1px 7px",
                          backgroundColor: "whitesmoke",
                          borderRadius: 5,
                          margin: 8,
                          padding: 8,
                        }}
                      >
                        <Form.Item
                          label="Số thẻ:"
                          name="cardnumber"
                          rules={[
                            {
                              pattern:
                                /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/,
                              message: "Nhập số thẻ từ 14 đến 16 số",
                            },
                            /*   {
                              required: true,
                              message: "Bạn chưa nhập nội dung.!",
                            }, */
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Tên in trên thẻ:"
                          name="cardname"
                          rules={[
                            {
                              required: true,
                              message: "Bạn chưa nhập nội dung.!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Ngày hết hạn:"
                          name="date"
                          rules={[
                            {
                              required: true,
                              message: "Bạn chưa nhập nội dung.!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Mã bảo mật:"
                          name="code"
                          rules={[
                            {
                              required: true,
                              message: "Bạn chưa nhập nội dung.!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Card>
                    )
                  }
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
      </Form>
      <Row justify="space-between">
        <Button
          onClick={() => setStep(1)}
          style={{
            margin: 10,
            float: "right",
            boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
          }}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => paymentForm.submit()}
          style={{
            margin: 10,
            float: "right",
            boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
          }}
        >
          Tiếp tục
        </Button>
      </Row>
    </>
  );
};

export default Payment;
