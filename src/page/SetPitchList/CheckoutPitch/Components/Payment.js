import { useState, useMemo } from "react";

import { Row, Button, Card, Radio, Col, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { bookingPitchAction } from "../../../../redux/actions";

const Payment = ({ setStep }) => {
  const { checkoutInfo, CheckoutTimeSelect } = useSelector(
    (state) => state.checkout
  );

  const { id } = useParams();
  console.log(id);
  const { userInfo } = useSelector((state) => state.user);
  const { pitchDetail } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [paymentForm] = Form.useForm();
  const handleSubmitPaymentForm = (values) => {
    /*  console.log(
      {
        ...values,
        ...checkoutInfo,
        userId: userInfo.data.id,
        date: CheckoutTimeSelect.date,
        timeOption: CheckoutTimeSelect.timeoption,
        PitchOrder: {
          pitchId: parseInt(id),
          pitchName: pitchDetail.data.name,
          arbitrationName: CheckoutTimeSelect.pitchBonus?.arbitrationId.name,
          comboName: CheckoutTimeSelect.pitchBonus.comboId.name,
        },
      },
      "values1"
    ); */
    dispatch(
      bookingPitchAction({
        ...values,
        ...checkoutInfo,
        userId: userInfo.data.id,
        date: CheckoutTimeSelect.date,
        timeOption: CheckoutTimeSelect.timeoption,
        PitchOrder: {
          pitchId: parseInt(id),
          pitchName: pitchDetail.data.name,
          arbitrationName:
            CheckoutTimeSelect.pitchBonus?.arbitrationSelect.name,
          comboName: CheckoutTimeSelect.pitchBonus.comboSelect.name,
        },
      })
    );
    setStep(3);
  };
  return (
    <>
      <h1>Payment</h1>
      <Form
        layout="vertical"
        name="paymentForm"
        form={paymentForm}
        onFinish={(values) => handleSubmitPaymentForm(values)}
      >
        <Card size="small">
          <Form.Item label="method" name="method">
            <Radio.Group>
              <Row>
                <Col span={24}>
                  <Radio value="cod">COD</Radio>
                </Col>
                <Col span={24}>
                  <Radio value="visa">Visa</Radio>
                </Col>
                <Col span={24}>
                  <Radio value="atm">ATM</Radio>
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
              <Card size="small">
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
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "atm" && (
              <Card size="small">
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
                  label="Ngân hàng:"
                  name="bank"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập nội dung.!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Row>
                      <Col span={24}>
                        <Radio value="vietcombank">Vietcombank</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="viettinbank">Viettinbank</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio>Saccombank</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
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
          Đặt sân !
        </Button>
      </Row>
    </>
  );
};

export default Payment;
