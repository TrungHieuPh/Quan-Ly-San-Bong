import React from "react";
import { useEffect, useState, useMemo } from "react";
import {
  Form,
  Button,
  Input,
  Col,
  Tabs,
  Table,
  Row,
  Avatar,
  Modal,
  Select,
  DatePicker,
  Calendar,
} from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { ROUTES } from "../../constants/routers";
import moment from "moment";
import "antd/dist/antd.css";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaBirthdayCake,
} from "react-icons/fa";
import {
  getOderListAction,
  getPitchDetailAction,
  changePasswordAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateAddressUser,
  getFavoriteList,
  getReviewListAction,
} from "../../redux/actions";
import * as S from "./style";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [birthday, setBirthday] = useState();
  const { userInfo } = useSelector((state) => state.user);
  function handleSelectedDate(values) {
    setBirthday(moment(values).format("DD/MM/YYYY"));
  }
  const dispatch = useDispatch();

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

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
    <Modal
      open={open}
      title="Cập nhập thông tin cá nhân"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: userInfo.data.fullName,
          phone: "",
          address: "",
          date: "",
          cityCode: undefined,
          districtCode: undefined,
          wardCode: undefined,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ của bạn!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Tỉnh thành"
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
                  form.setFieldsValue({
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
                  form.setFieldsValue({
                    wardCode: undefined,
                  });
                }}
                disabled={!form.getFieldValue("cityCode")}
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
              <Select disabled={!form.getFieldValue("districtCode")}>
                {renderWardListOptions}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Ngày sinh">
          {/*  <DatePicker
            onChange={(values) => setBirthday(values)}
            value={birthday !== "" ? moment(birthday) : ""}
          />{" "} */}
          <Calendar
            fullscreen={false}
            onChange={(values) => handleSelectedDate(values)}
            value={birthday}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Profile = () => {
  const [changePasswordForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { favoriteList } = useSelector((state) => state.favorite);
  console.log(favoriteList, "favoriteList");

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { pathname } = useLocation();

  const onCreate = (values) => {
    const { cityCode, districtCode, wardCode, ...otherValues } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
    /*  console.log(
      {
        ...otherValues,
        cityName: cityData.name,
        districtName: districtData.name,
        wardName: wardData.name,
      },
      "action"
    ); */
    dispatch(
      updateAddressUser({
        id: userInfo.data.id,
        ...otherValues,
        cityId: cityData.id,
        cityName: cityData.name,
        districtId: districtData.id,
        districtName: districtData.name,
        wardId: wardData.id,
        wardName: wardData.name,
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );

    setOpen(false);
  };

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOderListAction({ userId: userInfo.data.id }));
      dispatch(getPitchDetailAction());
      dispatch(getFavoriteList({ userId: userInfo.data.id }));
      dispatch(getReviewListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo.data]);
  useEffect(() => {
    dispatch(getCityListAction());
  }, []);
  const handleChangePassword = (values) => {
    /* console.log(
      {
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
      },
      "acss"
    ); */
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );
    window.location.reload();
  };

  const tableColumns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sân",
      dataIndex: "pitchName",
      key: "pitchName",
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VNĐ`,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];
  const tableColumnFavorite = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên ",
      dataIndex: "pitchName",
      key: "pitchName",
    },
    {
      title: "Tên sân",
      dataIndex: "fullName",
      key: "fullName",
      /*  render: (fullName) => fullName, */
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];
  return (
    <S.WrapperContainer>
      <S.ContentTopTitle>Hồ sơ cá nhân</S.ContentTopTitle>
      <Tabs tabPosition="left" defaultActiveKey="1">
        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
          <S.ContentTop>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              style={{ boxShadow: "rgb(0 0 0 / 50%) 0px 1px 12px" }}
            />
            <S.ContentTopItem>{userInfo.data.fullName}</S.ContentTopItem>
            <div>
              <Button
                type="link"
                danger
                onClick={() => {
                  setOpen(true);
                }}
              >
                Cập nhập thông tin.
              </Button>
            </div>
          </S.ContentTop>
          <S.ContentBottom>
            <S.ItemText>
              <FaEnvelope />
              &nbsp; Email:&nbsp; {userInfo.data.email}
            </S.ItemText>

            <S.ItemText>
              <FaLocationArrow /> &nbsp; Địa chỉ: &nbsp;
              {userInfo.data.info ? (
                <div>
                  {userInfo.data?.info?.address +
                    "-" +
                    userInfo.data?.info?.wardName +
                    "-" +
                    userInfo.data?.info?.districtName +
                    "-" +
                    userInfo.data?.info?.cityName}
                </div>
              ) : (
                <div>Bạn chưa có địa chỉ</div>
              )}
            </S.ItemText>
            <S.ItemText>
              <FaPhone />
              &nbsp; Điện thoại: &nbsp;
              {userInfo.data.info ? (
                <div>{userInfo.data?.info?.phone}</div>
              ) : (
                <div>Bạn chưa có số điện thoại</div>
              )}
            </S.ItemText>
            <S.ItemText>
              <FaBirthdayCake />
              &nbsp; Ngày sinh: &nbsp;
              {userInfo.data.date ? (
                <div>{userInfo.data.date}</div>
              ) : (
                <div>Bạn Chưa có ngày sinh</div>
              )}
            </S.ItemText>

            <CollectionCreateForm
              open={open}
              onCreate={onCreate}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </S.ContentBottom>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử" key="2">
          <Tabs>
            <Tabs.TabPane tab="Lịch sử đặt sân" key="1">
              <Table
                columns={tableColumns}
                dataSource={bookingList.data}
                rowKey="id"
                pagination={false}
                style={{
                  margin: 16,
                  padding: 16,
                  boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                  borderRadius: 5,
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <Row gutter={16}>
                      <Col span={6}>Combo nước: {record.comboName}</Col>
                      <Col span={6}>Trọng tài: {record.arbitrationName}</Col>
                      <Col span={6}>SĐT: {record.sdt}</Col>
                      <Col span={6}>{record.comboName}</Col>
                    </Row>
                  ),
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử yêu thích" key="2">
              <Table
                columns={tableColumnFavorite}
                dataSource={favoriteList.data}
                rowKey="id"
                pagination={false}
                style={{
                  margin: 16,
                  padding: 16,
                  boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                  borderRadius: 5,
                }}
                /*   expandable={{
                  expandedRowRender: (record) => (
                    <Row gutter={16}>
                      <Col span={6}>Combo nước: {record.comboName}</Col>
                      <Col span={6}>Trọng tài: {record.arbitrationName}</Col>
                      <Col span={6}>SĐT: {record.sdt}</Col>
                      <Col span={6}>{record.comboName}</Col>
                    </Row>
                  ),
                }} */
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử bình luận" key="3"></Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đổi mật khẩu" key="3">
          <Form
            form={changePasswordForm}
            name="changePasswordForm"
            layout="vertical"
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onFinish={(values) => handleChangePassword(values)}
            style={{
              padding: 16,
              margin: 16,
              boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
              borderRadius: 5,
            }}
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu của bạn!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu của bạn!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai mật khẩu bạn đã nhập không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button htmlType="submit" type="primary" danger block>
              Lưu thay đổi
            </Button>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </S.WrapperContainer>
  );
};

export default Profile;
