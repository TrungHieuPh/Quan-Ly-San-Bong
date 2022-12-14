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
  Divider,
  Calendar,
  Space,
  Radio,
  Popconfirm,
  Pagination,
  Upload,
} from "antd";

import { useNavigate, Link, generatePath, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  HistoryOutlined,
  SettingOutlined,
  CarryOutOutlined,
  UnlockOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../../constants/routers";
import moment from "moment";
import "antd/dist/antd.min.css";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaBirthdayCake,
  FaHammer,
} from "react-icons/fa";
import edit from "../../Images/edit.gif";
import login from "../../Images/login.gif";
import hacker from "../../Images/hacker.gif";
import user from "../../Images/user.png";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";
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
  getTeamListAction,
  deletePitchAction,
  getBlogListAction,
  browserBlogAction,
  deleteBlogAction,
} from "../../redux/actions";
import * as S from "./style";
import { ADMIN_TABLE_LIMIT } from "../../constants/paginations";

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
    dispatch(getBlogListAction());
    dispatch(getTeamListAction());
  }, []);
  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getBlogListAction({
        params: {
          page: 1,
          limit: PITCH_LIST_LIMIT,
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
      title="C???p nh???p th??ng tin c?? nh??n"
      okText="C???p nh???p"
      cancelText="H???y"
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
              label="H??? v?? t??n"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ?????a ch??? c???a b???n!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="T???nh th??nh"
              name="cityCode"
              rules={[
                {
                  required: true,
                  message: "H??y ch???n T???nh Th??nh ho???c Th??nh Ph??? !",
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
              label="Qu???n / Huy???n "
              name="districtCode"
              rules={[
                {
                  required: true,
                  message: "H??y ch???n Qu???n / Huy???n !",
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
              label="Khu v???c"
              name="wardCode"
              rules={[
                {
                  required: true,
                  message: "H??y ch???n khu v???c c???a b???n!",
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
          label="?????a ch???"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p ?????a ch??? c???a b???n!",
            },
            {
              max: 100,
              message: "???? qu?? gi???i h???n s??? t???!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="S??? ??i???n tho???i"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p s??? ??i???n tho???i c???a b???n!",
            },
            {
              pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "B???n nh???p ch??a ????ng s??? ??i???n tho???i",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="H??nh ???nh s??n"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
          }}
        >
          <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item name="date" label="Ng??y sinh">
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
  const day = new Date();
  const dayFormat = moment(day).format("DD/MM/YYYY");
  /*   const disabledDate = (current) => {
    return (
      current && current.valueOf() < moment(dayFormat, "DD/MM/YYYY").valueOf()
    );
  }; */
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { teamList } = useSelector((state) => state.team);

  const historyOffDay = bookingList.data.map((item, index) => {
    if (
      moment(item.date, "DD/MM/YYYY").valueOf() <
      moment(dayFormat, "DD/MM/YYYY").valueOf()
    ) {
      return item;
    }
  });
  const historyOnDay = bookingList.data.map((item, index) => {
    if (
      moment(item.date, "DD/MM/YYYY").valueOf() ===
      moment(dayFormat, "DD/MM/YYYY").valueOf()
    ) {
      return item;
    }
  });
  const historyReserveDay = bookingList.data.map((item, index) => {
    if (
      moment(item.date, "DD/MM/YYYY").valueOf() >
      moment(dayFormat, "DD/MM/YYYY").valueOf()
    ) {
      return item;
    }
  });

  const { favoriteList } = useSelector((state) => state.favorite);
  const { reviewList } = useSelector((state) => state.review);
  const { createPitchData } = useSelector((state) => state.product);
  const { pitch } = useSelector((state) => state.product);
  const { blogList } = useSelector((state) => state.blog);

  const tableData = pitch.data.map((item) => ({ ...item, key: item.id }));

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  /*  const handleUpdatePitch = async (values) => {
   const { options, images, ...pitchValues } = values;
   const newImages = [];
   for (let i = 0; i < images.length; i++) {
     const imgBase64 = await convertImageToBase64(images[i].originFileObj);
     await newImages.push({
       ...(images[i].id && { id: images[i].id }),
       name: images[i].name,
       type: images[i].type,
       thumbUrl: images[i].thumbUrl,
       url: imgBase64,
     });
   }
   dispatch(
     updatePitchAction({
       id: id,
       values: pitchValues,
       options: options,
       initialOptionIds: pitchDetail.data.times.map((item) => item.id),
       images: newImages,
       initialImageIds: pitchDetail.data.images.map((item) => item.id),
       callback: {
         goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
       },
     })
   );
 }; */
  const onCreate = async (values) => {
    const { images, cityCode, districtCode, wardCode, ...otherValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    const cityData = await cityList.data.find((item) => item.code === cityCode);
    const districtData = await districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = await wardList.data.find((item) => item.code === wardCode);

    console.log(
      ...otherValues,

      newImages,
      "aaaa"
    );
    /*  dispatch(
      updateAddressUser({
        id: userInfo.data.id,
        ...otherValues,
        cityId: cityData.id,
        cityName: cityData.name,
        districtId: districtData.id,
        districtName: districtData.name,
        wardId: wardData.id,
        wardName: wardData.name,
        images: newImages,
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
          goToHome: () => navigate(state?.prevPath || ROUTES.USER.HOME),
          reload: window.location.reload(),
        },
      })
    ); */

    setOpen(false);
  };
  /*  useEffect(() => {
    dispatch(
      getBlogListAction({
        params: {
          page: 1,
          limit: BLOG_LIST_LIMIT,
        },
      })
    );
  }, [blogList.data]); */
  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOderListAction({ userId: userInfo.data.id }));
      dispatch(getFavoriteList({ userId: userInfo.data.id }));
      dispatch(getReviewListAction({ userId: userInfo.data.id }));
      /*   dispatch(
        getBlogListAction({
          userId: userInfo.data.id,
          params: {
            page: 1,
            limit: BLOG_LIST_LIMIT,
          },
        })
      ); */
    }
  }, [userInfo.data]);
  useEffect(() => {
    if (userInfo.error) {
      changePasswordForm.setFields([
        {
          name: "oldPassword",
          errors: [userInfo.error],
        },
      ]);
    }
  }, [userInfo.error]);
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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
  const handleChangePagePitch = (page) => {
    dispatch(
      getPitchListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };
  const handleChangePageBlog = (page) => {
    dispatch(
      getBlogListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };
  const renderTeamList = useMemo(() => {
    return teamList.data.map((item) => {
      return (
        <Radio.Button key={item.id} value={item.id}>
          {item.name}
        </Radio.Button>
      );
    });
  }, [teamList.data]);

  const handleCreatePitch = async (values) => {
    const { images, ...pitchValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      console.log(imgBase64, "aaa");
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    /*  await dispatch(
      createPitchAction({
        values: {
          ...pitchValues,
          slug: slug(pitchValues.name),
        },
        images: newImages,
      })
    );
    navigate(-1); */
    console.log(values, "values");
  };

  const tableColumnsHistory = [
    {
      title: "S??? th??? t???",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T??n s??n",
      dataIndex: "pitchName",
      key: "pitchName",
    },
    {
      title: "Gi??",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VN??`,
    },

    {
      title: "Th???i gian ?????t s??n",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ng??y ?????t s??n",
      dataIndex: "date",
      key: "date",
      /*  render: (date) => moment(createdAt).format("DD/MM/YYYY HH:mm"), */
    },
    {
      title: "Ch???c n??ng ch???n",
      dataIndex: "pitchId",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: id })}>
              <h3>Xem chi ti???t</h3>
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
  const tableColumnFollow = [
    {
      title: "S??? th??? t???",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T??n s??n",
      dataIndex: "pitchName",
      key: "pitchName",
    },
    {
      title: "Gi??",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VN??`,
    },

    {
      title: "Khung gi??? ???? ch???n",
      dataIndex: "timeOption",
      key: "timeOption",
      render: (timeOption) => timeOption.name,
    },
    {
      title: "Ng??y ?????t s??n",
      dataIndex: "date",
      key: "date",
      /*  render: (date) => moment(createdAt).format("DD/MM/YYYY HH:mm"), */
    },
    {
      title: "Ch???c n??ng ch???n",
      dataIndex: "pitchId",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: id })}>
              <h3>Xem chi ti???t</h3>
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
      title: "S??? th??? t???",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "T??n s??n",
      dataIndex: "pitchName",
      key: "pitchName",
    },

    {
      title: "Ng??y",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];
  const tableColumnPitchListAdmin = [
    {
      title: "T??n",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space>
            <Avatar />
            <h3>{record.name}</h3>
          </Space>
        );
      },
    },

    {
      title: "Gi??",
      dataIndex: "price",
      key: "price",
      render: (price) => `${parseInt(price).toLocaleString()} VND`,
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Ch???c n??ng",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link
              style={{ color: "#a0d911" }}
              to={generatePath(ROUTES.ADMIN.UPDATE_PITCH, { id: id })}
            >
              Update
            </Link>
            <Popconfirm
              title="B???n c?? ch???c mu???n x??a s???n ph???m n??y kh??ng?"
              onConfirm={() => dispatch(deletePitchAction({ id: id }))}
              okText="C??"
              cancelText="Kh??ng"
            >
              <Button danger type="link">
                Delete
              </Button>
            </Popconfirm>
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
  const tableColumnBlogListAdmin = [
    {
      title: "T??n blog",
      dataIndex: "title",
      key: "title",
      /*  render: (_, record) => {
        return (
          <Space>
            <Avatar />
            <h3>{record.name}</h3>
          </Space>
        );
      }, */
    },

    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 1) {
          return "Ch??? duy???t";
        } else if (status === 2) {
          return "???? duy???t";
        }
      },
    },

    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Duy???t Blog",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space>
            {blogList.data.map((item) => {
              if (item.id === id && item.status === 1)
                return (
                  <Popconfirm
                    title="B???n c?? ch???c mu???n duy???t b??i vi???t n??y kh??ng?"
                    onConfirm={() => dispatch(browserBlogAction({ id: id }))}
                    okText="C??"
                    cancelText="Kh??ng"
                  >
                    <Button danger type="link">
                      Duy???t
                    </Button>
                  </Popconfirm>
                );
            })}
          </Space>
        );
      },
    },

    {
      title: "Ch???c n??ng",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link
              style={{ color: "#a0d911" }}
              to={generatePath(ROUTES.USER.BLOG_DETAIL, { id: id })}
            >
              Xem chi ti???t
            </Link>
            <Popconfirm
              title="B???n c?? ch???c mu???n x??a s???n ph???m n??y kh??ng?"
              onConfirm={() => dispatch(deleteBlogAction({ id: id }))}
              okText="C??"
              cancelText="Kh??ng"
            >
              <Button danger type="link">
                Delete
              </Button>
            </Popconfirm>
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
  const tableColumnBlog = [
    {
      title: "T??n",
      dataIndex: "title",
      key: "title",
      render: (_, record) => {
        return (
          <Space>
            <Avatar />
            <h3>{record.title}</h3>
          </Space>
        );
      },
    },

    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("HH:mm DD/MM/YYYY "),
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        (status === 1 && "??ang ch??? duy???t") ||
        (status === 2 && "??ang ho???t ?????ng"),
    },

    {
      title: "Ch???c n??ng",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link
              style={{ color: "#a0d911" }}
              to={generatePath(ROUTES.ADMIN.UPDATE_PITCH, { id: id })}
            >
              Update
            </Link>
            <Link
              style={{ color: "#a0d911" }}
              to={generatePath(ROUTES.USER.BLOG_DETAIL, { id: id })}
            >
              Chi ti???t
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
  return (
    <S.WrapperContainer>
      <S.ContentTopTitle>
        <img src={edit} alt="" style={{ width: 50, height: 50 }} /> H??? s?? c??
        nh??n
      </S.ContentTopTitle>
      {userInfo.data.id && (
        <Tabs tabPosition="left" defaultActiveKey="1">
          <Tabs.TabPane
            style={{ padding: 0 }}
            tab={
              <span>
                <UserOutlined />
                Th??ng tin c?? nh??n
              </span>
            }
            key="1"
          >
            <S.ContentTop>
              <div
                style={{
                  width: "max-content",
                  margin: "0 auto",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                }}
              >
                {userInfo.data.role === "admin" ? (
                  <img
                    src={hacker}
                    alt="hacker"
                    style={{
                      width: 280,
                      height: 290,
                      fontSize: 160,
                    }}
                  />
                ) : (
                  <img
                    src={user}
                    alt="hacker"
                    style={{
                      width: 280,
                      height: 290,
                      fontSize: 160,
                    }}
                  />
                )}
                <S.ContentTopItem>{userInfo.data.fullName}</S.ContentTopItem>
                <S.ContentTopItem>
                  {userInfo.data.role === "admin" && "admin"}
                </S.ContentTopItem>
              </div>
              <S.ButtonUpdateInfo>
                <Button
                  type="link"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <FaHammer style={{ color: "#a8071a" }} />
                  &nbsp; C???p nh???p th??ng tin.
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
                &nbsp; <div>{userInfo.data.email}</div>
              </S.ItemText>

              <S.ItemText>
                <div style={{ fontSize: 18 }}>
                  {" "}
                  <FaLocationArrow /> ?????a ch???:
                </div>
                &nbsp; &nbsp;
                <div>
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
                    <div>B???n ch??a c?? ?????a ch???</div>
                  )}
                </div>
              </S.ItemText>
              <S.ItemText>
                <div style={{ fontSize: 18 }}>
                  <FaPhone /> ??i???n tho???i:
                </div>
                &nbsp; &nbsp;
                <div>
                  {userInfo.data.info ? (
                    <div>{userInfo.data?.info?.phone}</div>
                  ) : (
                    <div>B???n ch??a c?? s??? ??i???n tho???i</div>
                  )}
                </div>
              </S.ItemText>
              <S.ItemText>
                <div style={{ fontSize: 18 }}>
                  {" "}
                  <FaBirthdayCake />
                  Ng??y sinh:
                </div>
                &nbsp; &nbsp;
                <div>
                  {" "}
                  {userInfo.data.date ? (
                    <div>{userInfo.data.date}</div>
                  ) : (
                    <div>B???n Ch??a c?? ng??y sinh</div>
                  )}
                </div>
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

          {/* Blog */}
          <Tabs.TabPane
            style={{ padding: 0 }}
            tab={
              <span>
                <FormOutlined />
                Blog
              </span>
            }
            key="2"
          >
            <S.WrapperAdminList>
              <S.WrapperAdminTitle>
                <S.AdminTitle>Danh s??ch Blog</S.AdminTitle>
                <Button type="primary" onClick={() => navigate(`/blogging`)}>
                  Th??m m???i
                </Button>
              </S.WrapperAdminTitle>
              <Table
                columns={tableColumnBlog}
                dataSource={blogList.data.filter((item) => {
                  return item.userId === userInfo.data.id;
                })}
                pagination={false}
                style={{ flex: 1 }}
              />
              <Pagination
                current={blogList.meta.page}
                pageSize={ADMIN_TABLE_LIMIT}
                total={blogList.meta.total}
                onChange={(page) => handleChangePageBlog(page)}
                style={{ margin: "16px auto 0" }}
              />
            </S.WrapperAdminList>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <CarryOutOutlined />
                Theo d??i l???ch tr??nh
              </span>
            }
            key="3"
          >
            <Tabs>
              <Tabs.TabPane tab="L???ch tr??nh h??m nay" key="1">
                <Table
                  columns={tableColumnFollow}
                  dataSource={historyOnDay.filter((item) => item !== undefined)}
                  rowKey="id"
                  pagination={false}
                  style={{
                    margin: 16,
                    padding: 16,
                    backgroundColor: "whitesmoke",
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
                          <Divider orientation="left">Tr???ng t??i</Divider>{" "}
                          {record.arbitrationName}
                        </Col>
                        <Col span={6}>
                          {" "}
                          <Divider orientation="left">??i???n tho???i</Divider>{" "}
                          {record.sdt}
                        </Col>
                        <Col span={6}>
                          {" "}
                          <Divider orientation="left">Ph????ng th???c</Divider>{" "}
                          {record.method}
                        </Col>
                      </Row>
                    ),
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="L???ch tr??nh ?????t tr?????c" key="2">
                <Table
                  columns={tableColumnFollow}
                  dataSource={historyReserveDay.filter(
                    (item) => item !== undefined
                  )}
                  rowKey="id"
                  pagination={false}
                  style={{
                    margin: 16,
                    padding: 16,
                    backgroundColor: "whitesmoke",
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
                          <Divider orientation="left">Tr???ng t??i</Divider>{" "}
                          {record.arbitrationName}
                        </Col>
                        <Col span={6}>
                          {" "}
                          <Divider orientation="left">??i???n tho???i</Divider>{" "}
                          {record.sdt}
                        </Col>
                        <Col span={6}>
                          {" "}
                          <Divider orientation="left">Ph????ng th???c</Divider>{" "}
                          {record.method}
                        </Col>
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
                <HistoryOutlined />
                L???ch s???
              </span>
            }
            key="4"
          >
            <Tabs>
              <Tabs.TabPane tab="L???ch s??? ?????t s??n" key="1">
                <Table
                  columns={tableColumnsHistory}
                  dataSource={historyOffDay.filter(
                    (item) => item !== undefined
                  )}
                  rowKey="id"
                  pagination={false}
                  style={{
                    margin: 16,
                    padding: 16,
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                  }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <Row gutter={24}>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">Combo</Divider>{" "}
                          {record.comboName}
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">Tr???ng t??i</Divider>{" "}
                          {record.arbitrationName}
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">??i???n tho???i</Divider>{" "}
                          {record.sdt}
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">Khung gi???</Divider>{" "}
                          {record.timeOption.name}
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">Ph????ng th???c</Divider>{" "}
                          {record.method}
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Divider orientation="left">
                            S??? t??i kho???n
                          </Divider>{" "}
                          {record.cardnumber}
                        </Col>
                      </Row>
                    ),
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="L???ch s??? y??u th??ch" key="2">
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
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="L???ch s??? b??nh lu???n" key="3">
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
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                  }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <Row gutter={16}>
                        <Col span={6}>
                          N???i dung b??nh lu???n: - {record.comment}
                        </Col>
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
                ?????i m???t kh???u
              </span>
            }
            key="5"
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
                borderRadius: 5,
              }}
            >
              <h1
                style={{
                  width: "45%",
                  padding: 16,
                  margin: " 0 auto",
                  backgroundColor: "whitesmoke",
                  borderRadius: 5,
                  fontSize: 40,
                  display: "flex",
                  fontWeight: 900,
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
                ?????i m???t kh???u
              </h1>
              <Form.Item
                label="M???t kh???u c??"
                name="oldPassword"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="M???t kh???u m???i"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m???t kh???u c???a b???n!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("oldPassword") !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("M???t kh???u tr??ng v???i m???t kh???u c??!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="X??c nh???n m???t kh???u"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng x??c nh???n m???t kh???u c???a b???n!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai m???t kh???u b???n ???? nh???p kh??ng kh???p!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button htmlType="submit" type="primary" danger block>
                L??u thay ?????i
              </Button>
            </Form>
          </Tabs.TabPane>
          {userInfo.data.role === "admin" && (
            <Tabs.TabPane
              tab={
                <span>
                  <UnlockOutlined />
                  D??nh cho Admin
                </span>
              }
              key="6"
            >
              {" "}
              <Tabs>
                <Tabs.TabPane
                  tab={
                    <span>
                      <UnlockOutlined />
                      D??nh cho Admin
                    </span>
                  }
                  key="1"
                >
                  <S.WrapperAdminList>
                    <S.WrapperAdminTitle>
                      <S.AdminTitle>Danh s??ch S??n</S.AdminTitle>
                      <Button
                        type="primary"
                        onClick={() => navigate(`/pitch/createpitch`)}
                      >
                        Th??m m???i
                      </Button>
                    </S.WrapperAdminTitle>
                    <Table
                      columns={tableColumnPitchListAdmin}
                      dataSource={tableData}
                      pagination={false}
                      style={{ flex: 1 }}
                    />
                    <Pagination
                      current={pitch.meta.page}
                      pageSize={ADMIN_TABLE_LIMIT}
                      total={pitch.meta.total}
                      onChange={(page) => handleChangePagePitch(page)}
                      style={{ margin: "16px auto 0" }}
                    />
                  </S.WrapperAdminList>
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <span>
                      <UnlockOutlined />
                      Blog
                    </span>
                  }
                  key="2"
                >
                  <S.WrapperAdminList>
                    <S.WrapperAdminTitle>
                      <S.AdminTitle>Danh s??ch Blog</S.AdminTitle>
                      <Button
                        type="primary"
                        onClick={() => navigate(ROUTES.USER.BLOGGING)}
                      >
                        Th??m m???i
                      </Button>
                    </S.WrapperAdminTitle>
                    <Table
                      columns={tableColumnBlogListAdmin}
                      dataSource={blogList.data}
                      pagination={false}
                      style={{ flex: 1 }}
                    />
                    <Pagination
                      current={blogList.meta.page}
                      pageSize={ADMIN_TABLE_LIMIT}
                      total={blogList.meta.total}
                      onChange={(page) => handleChangePageBlog(page)}
                      style={{ margin: "16px auto 0" }}
                    />
                  </S.WrapperAdminList>
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
          )}
        </Tabs>
      )}
    </S.WrapperContainer>
  );
};

export default Profile;
