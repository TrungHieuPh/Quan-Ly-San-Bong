import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Form, Select, Input } from "antd";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  setCheckoutInfoAction,
} from "../../../../redux/actions";
import * as S from "../styles";

const Info = ({ setStep }) => {
  const [infoForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

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
    /* const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );

    const wardData = wardList.data.find((item) => item.code === wardCode); */
    console.log(values);
    dispatch(
      setCheckoutInfoAction({
        ...otherValues,
        /*    cityId: cityData.id,
        cityName: cityData.name,
        districtId: districtData.id,
        districtName: districtData.name,
        wardId: wardData.id,
        wardName: wardData.name, */
      })
    );
    setStep(2);
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

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
              <Form.Item label="Email: " name="email">
                <Input disabled />
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
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item
                label="Thành phố / Tỉnh thành"
                name="cityCode"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn Tỉnh Thành hoặc Thành Phố !",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    infoForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận / Huyện "
                name="districtCode"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn Quận / Huyện !",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    infoForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                  disabled={!infoForm.getFieldValue("cityCode")}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Khu vực"
                name="wardCode"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn khu vực của bạn!",
                  },
                ]}
              >
                <Select disabled={!infoForm.getFieldValue("districtCode")}>
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col> */}
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
