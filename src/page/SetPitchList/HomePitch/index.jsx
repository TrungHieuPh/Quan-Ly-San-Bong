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
  notification,
  Radio,
  Tabs,
  PageHeader,
  Drawer,
  Content,
  Statistic,
  Descriptions,
} from "antd";
import React from "react";
import { useEffect, useMemo, useForm } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
  bookingPitchAction,
  getOderListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import pitchs from "../../../Images/pitchs.jpg";
import calendar from "../../../Images/calendar.gif";
import stadiumU from "../../../Images/stadiumU.gif";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import { FaCalendarPlus, FaDollarSign, FaMapMarkedAlt } from "react-icons/fa";
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
  console.log(filterParams);

  const [tabs, setTabs] = useState("1");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  console.log(selectedOption, "ssss");
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
      /*   dispatch(
        getPitchListAction({
          params: {
            ...filterParams,
            page: 1,
            limit: PITCH_LIST_LIMIT,
          },
          dateSelected: moment(value).format("DD/MM/YYYY"),
        })
      ); */
    } else {
      setFilterParams({
        ...filterParams,
        dateSelected: null,
      });
    }
  }

  const isDisabledButton = filterParams.dateSelected === null ? true : false;

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
  const handleSetPitch = (id) => {
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
                /*  onClick={() => setIds(id)} */
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
              <div style={{ width: "60%" }}>
                <Space
                  style={{
                    alignItems: "start",
                  }}
                >
                  <img
                    src={stadiumU}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                  <h3 style={{ fontSize: 26 }}> {item.name}</h3>
                </Space>
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    {item.times?.map((itemTime) => {
                      return (
                        <Button
                          onChange={(e) => setSelectedOption(e.target.value)}
                          size="small"
                        >
                          {itemTime.name}
                        </Button>
                      );
                    })}
                  </Col>
                  <Col span={12}>
                    <div style={{ fontSize: 20 }}>
                      <FaMapMarkedAlt />
                      {item.address}
                    </div>

                    <h2 style={{ fontSize: 30 }}>
                      <FaDollarSign />
                      {parseFloat(item.price).toLocaleString()}đ
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button
                      type="primary"
                      block
                      danger
                      onClick={() => navigate(`/pitch/${item.id}/setpitch`)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      type="primary"
                      block
                      danger
                      onClick={() =>
                        navigate(
                          generatePath(ROUTES.USER.CHECKOUT, { id: item.id })
                        )
                      }
                    >
                      Đặt sân
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      );
    });
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
                <Row
                  gutter={[16, 16]}
                  style={{
                    border: "1px solid white",
                    margin: 16,
                    backgroundColor: " white",
                    boxShadow: " rgb(0 0 0 / 50%) -1px 1px 8px",
                    alignItems: " baseline",
                    justifyContent: "space-between",
                    alignContent: "center",
                    borderRadius: 5,
                  }}
                >
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
            </Row>
          </Card>
        </Form>
      </Spin>
    </S.Wrapper>
  );
}
export default HomePitch;
