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
} from "antd";
import React from "react";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
  getOderListAction,
  getReviewListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import calendar from "../../../Images/calendar.gif";
import locations from "../../../Images/locations.gif";
import cashback from "../../../Images/cashback.gif";
import flag from "../../../Images/flag.gif";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import { FaCalendarPlus, FaCommentDots, FaStar } from "react-icons/fa";
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

  const [selectedOption, setSelectedOption] = useState();
  console.log(selectedOption, "ssss");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitch } = useSelector((state) => state.product);
  const { pitchDetail } = useSelector((state) => state.product);
  const { bookingList } = useSelector((state) => state.booking);
  const { reviewList } = useSelector((state) => state.review);
  console.log(reviewList, "reviewList");

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
    dispatch(getReviewListAction({ userId: userInfo.data.id }));
  }, [userInfo.data]);

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
  const dateTime =
    day.setHours("23") +
    ":" +
    day.setMinutes("59") +
    ":" +
    day.setSeconds("59");
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

  /* const handleCheckDateTimeOrder = (id) => {
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
  }; */
  /*   const handleSetPitch = (id) => {
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
               
              >
                Đặt Sân
              </Button>
            )}
          </div>
        )}
      </>
    );
  }; */
  /* const handleSelectOption = useMemo(() => {
    return pitch.data.map((item) => {
      return (
        <Radio.Group
          key={item.times?.id}
          name="option"
          value={item.times?.id}
          style={{ margin: 6 }}
        >
          {item.times.map((itemtime) => {
            return <Radio.Button>{itemtime.name}</Radio.Button>;
          })}
        </Radio.Group>
      );
    });
  },[]); */
  /*   const avengerRating = reviewList.data
    .map((item) => item.rate)
    .reduce((total, rate) => total + rate, 0);
  const countAverageRating = avengerRating / reviewList.data.length || 0; */
  const renderPitchList = () => {
    return pitch.data.map((item) => {
      /*     if (filterParams.dateSelected !== undefined) { */
      return (
        <Col
          span={24}
          key={item.id}
          style={{
            padding: "10px 5px 15px 5px",
            border: "1px solid white",
            backgroundColor: "white",
            boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
            borderRadius: 10,
          }}
        >
          <div>
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
                    width: "220px",
                    height: "220px",
                    objectFit: "cover",
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
                    src={flag}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                  <h3 style={{ fontSize: 26, color: "#cf1322" }}>
                    {" "}
                    {item.name}
                  </h3>
                </Space>
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <h6>Khung giờ:</h6>
                    {item.times?.map((itemTime) => {
                      return (
                        <Tag
                          onChange={(e) => setSelectedOption(e.target.value)}
                          size="small"
                          style={{ color: "#cf1322" }}
                        >
                          {itemTime.name}
                        </Tag>
                      );
                    })}
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h4 style={{ fontFamily: "cursive" }}>
                        {item.reviews
                          .map((item) => {
                            return item.rate;
                          })
                          .reduce((total, rate) => total + rate, 0) /
                          item.reviews.length || 0}
                        <FaStar style={{ color: "#faad14" }} />
                      </h4>
                      &nbsp; || &nbsp;
                      <h4 style={{ fontFamily: "cursive" }}>
                        {item.reviews.length}
                        <FaCommentDots style={{ color: "#8c8c8c" }} />
                      </h4>
                    </div>
                    <S.ItemPrice>
                      <h6 style={{ fontSize: 12, color: "#cf1322" }}>
                        Giá chỉ từ
                      </h6>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={cashback}
                          style={{
                            width: 40,
                            height: 40,
                          }}
                          alt=""
                        />
                        {parseFloat(item.price).toLocaleString()}đ
                      </div>
                    </S.ItemPrice>
                    <div
                      style={{
                        fontSize: 20,
                        display: "flex",
                        color: "#cf1322",
                      }}
                    >
                      <img
                        src={locations}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        alt=""
                      />
                      {item.address}
                    </div>
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
        <Form form={registerForm}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                size="small"
                bordered="false"
                style={{
                  marginTop: 16,
                  wordWrap: "break-word",
                  backgroundColor: "#E5E5E5",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col>
                    <S.TitleContent
                      xs={{ span: 24, order: 1 }}
                      /*   md={{ span: 24, order: 1 }} */
                    >
                      <FaCalendarPlus />
                      <h1>Thông tin Sân</h1>
                    </S.TitleContent>
                  </Col>

                  <Col md={24} xs={{ span: 24, order: 1 }}>
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <img
                          src={calendar}
                          alt=""
                          style={{ height: "50px", width: "50px" }}
                        />
                        <h1>Ngày đặt sân:</h1>
                      </div>

                      <Col span={24}>
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
                      </Col>
                    </Row>
                  </Col>

                  <Col md={{ span: 24, order: 2 }} xs={{ span: 24, order: 1 }}>
                    <Row
                      gutter={[24, 24]}
                      style={{ marginBottom: 16, padding: 16 }}
                    >
                      <Col Col md={6} xs={24}>
                        <Input
                          placeholder="Nhập từ khóa tìm kiếm"
                          onChange={(e) =>
                            handleFilter("keyword", e.target.value)
                          }
                          value={filterParams.keyword}
                          prefix={<SearchOutlined />}
                          style={{
                            backgroundColor: "white",
                            boxShadow: " rgb(0 0 0 / 50%) -1px 1px 8px",
                            margin: "0px 0px 10px 0px",
                          }}
                        />

                        <Select
                          placeholder="Sắp xếp theo"
                          allowClear
                          onChange={(value) => handleChangeSort(value)}
                          style={{
                            backgroundColor: "white",
                            boxShadow: " rgb(0 0 0 / 50%) -1px 1px 8px",
                            margin: "0px 0px 10px 0px",
                            width: "100%",
                            borderRadius: 5,
                          }}
                        >
                          <Select.Option value="asc">
                            Giá tăng dần{" "}
                          </Select.Option>
                          <Select.Option value="desc">
                            Giá giảm dần
                          </Select.Option>
                        </Select>
                      </Col>
                      <Col md={16} xs={24}>
                        <Row gutter={[16, 16]}>
                          <div style={{ marginBottom: 16 }}>
                            <Col>
                              {renderFilterTimeShoot()}
                              {filterParams.keyword && (
                                <Tag
                                  closable
                                  onClose={() => handleClearKeywordFilter()}
                                >
                                  Keyword: {filterParams.keyword}
                                </Tag>
                              )}
                            </Col>
                          </div>
                        </Row>

                        <Row gutter={[16, 16]}>{renderPitchList()}</Row>

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
            </Col>
          </Row>
        </Form>
      </Spin>
    </S.Wrapper>
  );
}
export default HomePitch;
