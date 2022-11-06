import {
  Button,
  Card,
  Space,
  Input,
  Row,
  Col,
  Select,
  Tag,
  DatePicker,
  Form,
  Spin,
  Radio,
  Tabs,
  PageHeader,
  Drawer,
  Statistic,
  Descriptions,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
  bookingPitchAction,
  getOderListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import calendar from "../../../Images/calendar.gif";
import stadiumU from "../../../Images/stadiumU.gif";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import { FaCalendarPlus, FaDollarSign, FaLocationArrow } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function HomePitch() {
  const [filterParams, setFilterParams] = useState({
    keyword: "",
    price: [0, 10000000],
    sortFilter: "",
    timeShootId: [],
    dateSelected: undefined,
  });

  const [tabs, setTabs] = useState("1");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [ids, setIds] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitch } = useSelector((state) => state.product);
  const { pitchDetail } = useSelector((state) => state.product);
  const { bookingList } = useSelector((state) => state.booking);

  const { userInfo } = useSelector((state) => state.user);
  const { timeShootList } = useSelector((state) => state.timeShoot);
  const [registerForm] = Form.useForm();
  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
    dispatch(getTimeShootListAction());
    dispatch(getOderListAction({}));
  }, []);

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      [key]: value,
    });
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          [key]: value,
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          page: pitch.meta.page + 1,
          limit: PITCH_LIST_LIMIT,
        },
        more: true,
      })
    );
  };

  const handleClearKeywordFilter = () => {
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          keyword: "",
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
  };
  const handleChangeSort = (value) => {
    setFilterParams({
      ...filterParams,
      sortFilter: value,
    });
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          sortFilter: value,
          limit: PITCH_LIST_LIMIT,
          page: 1,
        },
      })
    );
  };

  const renderFilterTimeShoot = () => {
    return filterParams.timeShootId.map((filterItem) => {
      const timeShootData = timeShootList.data.find(
        (timeShootItem) => timeShootItem.id === filterItem
      );
      return (
        <Tag
          key={filterItem}
          closable
          onClose={() => handleClearTimeShootFilter(filterItem)}
        >
          {timeShootData.name}
        </Tag>
      );
    });
  };
  const handleClearTimeShootFilter = (id) => {
    const newTimeShootId = filterParams.timeShootId.filter(
      (item) => item !== id
    );
    setFilterParams({
      ...filterParams,
      timeShootId: newTimeShootId,
    });
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          timeShootId: newTimeShootId,
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
  };

  const day = new Date();
  day.setDate(day.getDate());
  const disabledDate = (current) => {
    return current && current.valueOf() < day;
  };

  function handleSelectedDate(value) {
    if (value != null) {
      setFilterParams({
        ...filterParams,
        dateSelected: moment(value).format("DD/MM/YYYY"),
      });
      dispatch(
        getPitchListAction({
          params: {
            ...filterParams,
            page: 1,
            limit: PITCH_LIST_LIMIT,
          },
          dateSelected: moment(value).format("DD/MM/YYYY"),
        })
      );
    } else {
      setFilterParams({
        ...filterParams,
        dateSelected: null,
      });
    }
  }

  const handleCheckDateTimeOrder = (id) => {
    let isDisabled = false;
    if (filterParams.dateSelected)
      Array.from(bookingList.data).forEach((bookingItem, bookingIndex) => {
        if (
          moment(filterParams.dateSelected, "DD/MM/YYYY").valueOf() ===
            moment(bookingItem.timeSelect, "DD/MM/YYYY").valueOf() &&
          selectedOption === bookingItem.timeId
        ) {
          isDisabled = true;
        }
      });
    return (
      <>
        {userInfo.data.id && (
          <div>
            {isDisabled && (
              <Button type="primary" block disabled danger>
                Đặt Sân
              </Button>
            )}
            {!isDisabled && (
              <Button
                htmlType="submit"
                type="primary"
                block
                danger
                onClick={() => setIds(id)}
              >
                Đặt Sân
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const renderPitchList = () => {
    return pitch.data.map((item) => {
      /*     if (filterParams.dateSelected !== undefined) { */
      return (
        <Col
          span={24}
          key={item.id}
          style={{
            border: "1px solid white",
            margin: 16,
            backgroundColor: "white",
            boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
          }}
        >
          <div
          /*  style={{ width: "100%" }}
            to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: item.id })} */
          >
            <div
              style={{
                fontSize: "20px",
                display: "flex",
                width: "100%",
                alignContent: "space-around",
                justifyContent: "space-around",
              }}
            >
              <div style={{ width: "30%" }}>
                <img
                  key={item.images[0]?.id}
                  src={item.images[0]?.url}
                  alt={item.images[0]?.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: 16,
                    borderRadius: 6,
                  }}
                />
              </div>
              <div style={{ width: "30%" }}>
                <Space
                  style={{
                    alignItems: "start",
                  }}
                >
                  <img
                    src={stadiumU}
                    alt=""
                    style={{ height: "70px", width: "70px" }}
                  />
                  <h1> {item.name}</h1>
                </Space>

                <div hidden>{item.id}</div>
                <div style={{ fontSize: 20 }}>
                  <FaLocationArrow />
                  {item.address}
                </div>
                <div>{item.id}</div>
                <Space>
                  <Form.Item
                    label=""
                    name="radio"
                    rules={[
                      {
                        required: true,
                        message: "chon option",
                      },
                    ]}
                  >
                    <Radio.Group name="radiogroup" defaultValue={item.times.id}>
                      {item.times.map((itemTime) => {
                        return (
                          <Radio
                            disabled={
                              filterParams.dateSelected &&
                              bookingList.data.forEach(
                                (bookingItem, bookingIndex) => {
                                  if (
                                    moment(
                                      filterParams.dateSelected,
                                      "DD/MM/YYYY"
                                    ).valueOf() ===
                                      moment(
                                        bookingItem.timeSelect,
                                        "DD/MM/YYYY"
                                      ).valueOf() &&
                                    selectedOption === bookingItem.timeId
                                  ) {
                                    return true;
                                  }
                                }
                              )
                            }
                            key={itemTime.id}
                            name="option"
                            value={itemTime.id}
                            onChange={(e) => setSelectedOption(e.target.value)}
                          >
                            {itemTime.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </div>

              <div
                style={{
                  width: "20%",
                  margin: 16,
                  height: "100%",
                  borderLeft: "1px solid #ddd",
                  padding: "45px 0px 58px 10px",
                }}
              >
                <h2 style={{ fontSize: 30 }}>
                  <FaDollarSign />
                  {parseFloat(item.price).toLocaleString()}
                </h2>
                <Button
                  type="primary"
                  block
                  danger
                  onClick={() => navigate(`/pitch/${item.id}/setpitch`)}
                >
                  Chi tiết
                </Button>

                {handleCheckDateTimeOrder(item.id)}
              </div>
            </div>
          </div>
        </Col>
      );
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      <Statistic
        title="Trạng thái"
        value="padding"
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Giá" prefix="$" value={pitchDetail.data.price} />
    </div>
  );
  const Content = ({ children, extra }) => (
    <div className="content" style={{ display: "flex" }}>
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Tên ">
        {userInfo.data.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Địa chỉ sân">
        {pitchDetail.data.address}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{userInfo.data.email}</Descriptions.Item>
      <Descriptions.Item label="Ngày đặt sân">
        {pitch.dateSelected}
      </Descriptions.Item>
    </Descriptions>
  );
  //
  const handleBookingPitch = (ids) => {
    if (!userInfo) {
      alert("Bạn cần đăng nhập!");
    } else {
      dispatch(
        bookingPitchAction({
          pitchsId: ids.id,
          timeSelect: pitch.dateSelected,
          timeId: selectedOption,
          userId: userInfo.data.id,
        })
      );
    }
    alert("đặt sân thành công");
    navigate(ROUTES.USER.PITCH_LIST);
  };

  return (
    <S.Wrapper>
      <Spin spinning={pitch.loading}>
        <Form form={registerForm} onFinish={() => setOpen(true)}>
          <Card
            size="small"
            bordered="false"
            style={{
              marginTop: 16,
              wordWrap: "break-word",
              backgroundColor: "#E5E5E5",
            }}
          >
            <S.TitleContent>
              <FaCalendarPlus />
              <h1>Thông tin Sân</h1>
            </S.TitleContent>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col
                    span={6}
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <img
                      src={calendar}
                      alt=""
                      style={{ height: "50px", width: "50px" }}
                    />
                    <h1>Ngày đặt sân:</h1>
                  </Col>

                  <Col span={16}>
                    <div size="small" title="Ngày đặt sân ">
                      <Form.Item
                        label=""
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa chọn ngày!",
                          },
                        ]}
                      >
                        <DatePicker
                          bordered="true"
                          disabledDate={disabledDate}
                          style={{ fontSize: 30, width: "100%" }}
                          onChange={(values) => handleSelectedDate(values)}
                          initialValues={filterParams.dateSelected}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Row gutter={[16, 16]}></Row>
              <Col span={24}>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col span={6}>
                    <Input
                      placeholder="Nhập từ khóa tìm kiếm"
                      onChange={(e) => handleFilter("keyword", e.target.value)}
                      value={filterParams.keyword}
                      prefix={<SearchOutlined />}
                    />
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Sắp xếp theo"
                      allowClear
                      onChange={(value) => handleChangeSort(value)}
                    >
                      <Select.Option value="asc">Giá tăng dần </Select.Option>
                      <Select.Option value="desc">Giá giảm dần</Select.Option>
                    </Select>
                  </Col>

                  <Col span={16}>
                    <Row style={{ marginBottom: 16 }}>
                      {renderFilterTimeShoot()}
                      {filterParams.keyword && (
                        <Tag
                          closable
                          onClose={() => handleClearKeywordFilter()}
                        >
                          Keyword: {filterParams.keyword}
                        </Tag>
                      )}
                    </Row>

                    <Col>{renderPitchList()}</Col>

                    {pitch.data.length !== pitch.meta.total && (
                      <Row justify="center">
                        <Button
                          style={{ margin: 16 }}
                          onClick={() => handleShowMore()}
                        >
                          Xem Thêm
                        </Button>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>
              <Drawer
                title="Thông Tin Cá Nhân Người Dùng"
                placement="top"
                width={500}
                onClose={onClose}
                open={open}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                  </Space>
                }
              >
                <PageHeader
                  className="site-page-header-responsive"
                  footer={
                    <Tabs activeKey={tabs}>
                      <Tabs.TabPane tab="Thủ tục thanh toán" key="1">
                        <Content extra={extraContent}>
                          {renderContent()}
                          <Button
                            type="primary"
                            danger
                            onClick={() => setTabs("2")}
                          >
                            Tiếp tục
                          </Button>
                        </Content>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Tiếp tục" key="2">
                        <div>
                          <h3>Chọn phương thức thanh toán </h3>
                          <Button
                            type="link"
                            onClick={() => handleBookingPitch(ids)}
                          >
                            Thanh toán qua thẻ ngân hàng
                          </Button>
                        </div>
                        <Button
                          type="primary"
                          danger
                          onClick={() => setTabs("1")}
                        >
                          Quay lại
                        </Button>
                      </Tabs.TabPane>
                    </Tabs>
                  }
                ></PageHeader>
              </Drawer>
            </Row>
          </Card>
        </Form>
      </Spin>
    </S.Wrapper>
  );
}
export default HomePitch;
