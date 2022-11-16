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
  Divider,
  Calendar,
  Space,
} from "antd";

import { useNavigate, Link, generatePath, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  HistoryOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../../constants/routers";
import moment from "moment";
import "antd/dist/antd.css";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaBirthdayCake,
  FaHammer,
  FaUser,
} from "react-icons/fa";
import edit from "../../Images/edit.gif";
import login from "../../Images/login.gif";
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
  getPitchListAction,
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
  useEffect(() => {
    dispatch(getPitchDetailAction());
    dispatch(getCityListAction());
    dispatch(getPitchListAction());
  }, []);
  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
        },
      })
    );
  }, []);
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
      okText="Cập nhập"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          fullName: userInfo.data.fullName || "",
          phone: userInfo.data.info?.phone || "",
          address: userInfo.data?.info?.address || "",
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
  const { state } = useLocation();

  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { favoriteList } = useSelector((state) => state.favorite);
  const { reviewList } = useSelector((state) => state.review);

  const { pitch } = useSelector((state) => state.product);

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  const onCreate = (values) => {
    const { cityCode, districtCode, wardCode, ...otherValues } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
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
          goToHome: () => navigate(state?.prevPath || ROUTES.USER.HOME),
          reload: () => window.location.reload(),
        },
      })
    );

    setOpen(false);
  };

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOderListAction({ userId: userInfo.data.id }));
      dispatch(getFavoriteList({ userId: userInfo.data.id }));
      dispatch(getReviewListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo.data]);

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
    {
      title: "Chức năng chọn",
      dataIndex: "pitchId",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: id })}>
              <h3>Xem chi tiết</h3>
            </Link>
          </Space>
          /* pitch.data.map((item, index) => {
            return (
              <Link
                to={generatePath(ROUTES.ADMIN.UPDATE_PITCH, { id: item.id })}
              >
                Update
              </Link>
            );
          }) */
        );
      },
    },
  ];
  const tableColumnFavorite = [
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
      title: "Ngày",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];

  return (
    <S.WrapperContainer>
      <S.ContentTopTitle>
        <img src={edit} alt="" style={{ width: 50, height: 50 }} /> Hồ sơ cá
        nhân
      </S.ContentTopTitle>
      <Tabs tabPosition="left" defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              Thông tin cá nhân
            </span>
          }
          key="1"
        >
          <S.ContentTop>
            <Avatar
              shape="square"
              size={150}
              icon={<UserOutlined />}
              style={{
                width: 280,
                height: 290,
                fontSize: 160,
                boxShadow: "rgb(0 0 0 / 50%) 0px 1px 12px",
              }}
            />
            <S.ContentTopItem>{userInfo.data.fullName}</S.ContentTopItem>
            <S.ButtonUpdateInfo>
              <Button
                type="link"
                danger
                onClick={() => {
                  setOpen(true);
                }}
              >
                <FaHammer style={{ color: "#1890ff" }} />
                &nbsp; Cập nhập thông tin.
              </Button>
            </S.ButtonUpdateInfo>
          </S.ContentTop>
          <S.ContentBottom>
            <S.ItemText>
              &nbsp;
              <div style={{ fontSize: 18 }}>
                <FaEnvelope />
                Email:
              </div>{" "}
              &nbsp; <h6>{userInfo.data.email}</h6>
            </S.ItemText>

            <S.ItemText>
              <div style={{ fontSize: 18 }}>
                {" "}
                <FaLocationArrow /> Địa chỉ:
              </div>
              &nbsp; &nbsp;
              <h6>
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
              </h6>
            </S.ItemText>
            <S.ItemText>
              <div style={{ fontSize: 18 }}>
                <FaPhone /> Điện thoại:
              </div>
              &nbsp; &nbsp;
              <h6>
                {userInfo.data.info ? (
                  <div>{userInfo.data?.info?.phone}</div>
                ) : (
                  <div>Bạn chưa có số điện thoại</div>
                )}
              </h6>
            </S.ItemText>
            <S.ItemText>
              <div style={{ fontSize: 18 }}>
                {" "}
                <FaBirthdayCake />
                Ngày sinh:
              </div>
              &nbsp; &nbsp;
              <h6>
                {" "}
                {userInfo.data.date ? (
                  <div>{userInfo.data.date}</div>
                ) : (
                  <div>Bạn Chưa có ngày sinh</div>
                )}
              </h6>
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
        <Tabs.TabPane
          tab={
            <span>
              <HistoryOutlined />
              Lịch sử
            </span>
          }
          key="2"
        >
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
                    <Row gutter={20}>
                      <Col span={6}>
                        {" "}
                        <Divider orientation="left">Combo</Divider>{" "}
                        {record.comboName}
                      </Col>
                      <Col span={6}>
                        {" "}
                        <Divider orientation="left">Trọng tài</Divider>{" "}
                        {record.arbitrationName}
                      </Col>
                      <Col span={6}>
                        {" "}
                        <Divider orientation="left">Điện thoại</Divider>{" "}
                        {record.sdt}
                      </Col>
                      <Col span={6}>
                        {" "}
                        <Divider orientation="left">Phương thức</Divider>{" "}
                        {record.method}
                      </Col>
                      <Col span={6}>
                        {" "}
                        <Divider orientation="left">Số tài khoản</Divider>{" "}
                        {record.cardnumber}
                      </Col>
                    </Row>
                  ),
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử yêu thích" key="2">
              <Table
                columns={tableColumnFavorite}
                dataSource={favoriteList.data.filter((item) => {
                  return item.userId === userInfo.data.id;
                })}
                rowKey="id"
                pagination={false}
                style={{
                  margin: 16,
                  padding: 16,
                  boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                  borderRadius: 5,
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử bình luận" key="3">
              <Table
                columns={tableColumnFavorite}
                dataSource={reviewList.data.filter((item) => {
                  return item.userId === userInfo.data.id;
                })}
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
                      <Col span={6}>Nội dung bình luận: - {record.comment}</Col>
                    </Row>
                  ),
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <SettingOutlined />
              Đổi mật khẩu
            </span>
          }
          key="3"
        >
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
            <h1
              style={{
                width: "45%",
                padding: 16,
                margin: " 0 auto",
                boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                borderRadius: 5,
                fontSize: 40,
                display: "flex",
              }}
            >
              <img
                src={login}
                alt=""
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              Đổi mật khẩu
            </h1>
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
