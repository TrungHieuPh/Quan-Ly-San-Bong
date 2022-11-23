import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Form, Input } from "antd";

import {
  getCityListAction,
  setCheckoutInfoAction,
} from "../../../../redux/actions";
import * as S from "../styles";

const Info = ({ setStep }) => {
  const [infoForm] = Form.useForm();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const initialValue = {
    name: userInfo.data.fullName || "",
    email: userInfo.data.email || "",
    sdt: "",
    address: "",
    cityCode: undefined,
    districtCode: undefined,
    wardCode: undefined,
  };

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);
  useEffect(() => {
    if (userInfo.data.id) infoForm.resetFields();
  }, [userInfo.data]);

  const handleSubmitInfoForm = (values) => {
    const { cityCode, districtCode, wardCode, ...otherValues } = values;

    dispatch(
      setCheckoutInfoAction({
        ...otherValues,
      })
    );
    setStep(2);
  };
  return (
    <>
      <S.ItemTitleInfo>Thông tin</S.ItemTitleInfo>
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
        <Form
          layout="vertical"
          name="infoForm"
          form={infoForm}
          initialValues={initialValue}
          onFinish={(values) => handleSubmitInfoForm(values)}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Họ và tên: "
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên người thuê sân!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email: "
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Bạn hãy nhập Email!",
                  },
                  {
                    pattern:
                      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                    message: "Nhập chưa đúng email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Số điện thoại"
                name="sdt"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại !",
                  },
                  {
                    pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Bạn nhập chưa đúng số điện thoại",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-between">
        <Button
          onClick={() => setStep(0)}
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
          onClick={() => infoForm.submit()}
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

export default Info;
