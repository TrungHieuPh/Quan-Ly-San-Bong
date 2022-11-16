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
  Checkbox,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { generatePath, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
  getOderListAction,
  getReviewListAction,
  getTeamListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import search from "../../../Images/search.gif";
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
    teamId: [],
    keyword: "",
    price: [0, 10000000],
    sortFilter: "",
    timeShootId: [],
    dateSelected: undefined,
  });

  const [selectedOption, setSelectedOption] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitch } = useSelector((state) => state.product);
  const { teamList } = useSelector((state) => state.team);
  const { bookingList } = useSelector((state) => state.booking);
  const { reviewList } = useSelector((state) => state.review);

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
    dispatch(getTeamListAction());
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

  const renderTeamOptions = () => {
    return teamList.data.map((item, index) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  };

  const renderFilterTeam = () => {
    return filterParams.teamId.map((filterItem) => {
      const teamData = teamList.data.find(
        (teamItem) => teamItem.id === filterItem
      );
      if (!teamData) return null;
      return (
        <Tag
          key={filterItem}
          closable
          onClose={() => handleClearTeamFilter(filterItem)}
        >
          {teamData.name}
        </Tag>
      );
    });
  };
  const handleClearTeamFilter = (id) => {
    const newTeamId = filterParams.teamId.filter((item) => item !== id);
    setFilterParams({
      ...filterParams,
      teamId: newTeamId,
    });
    dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          teamId: newTeamId,
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
    } else {
      setFilterParams({
        ...filterParams,
        dateSelected: null,
      });
    }
  }
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
          <Row gutter={[16, 16]}>
            {/*  <div
              style={{
                fontSize: "20px",
                display: "flex",
                width: "100%",
                alignContent: "space-around",
                justifyContent: "space-around",
              }}
            > */}
            <Col
              md={{ span: 8, order: 1 }}
              xs={{ span: 12, order: 1 }}
              style={{ width: "100%" }}
            >
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
            </Col>
            <Col
              md={{ span: 16, order: 1 }}
              xs={{ span: 24, order: 1 }}
              style={{ width: "100%" }}
            >
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
                <h2 style={{ fontSize: 26, color: "#cf1322" }}> {item.name}</h2>
              </Space>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h2 style={{ fontFamily: "cursive" }}>
                  {item.reviews
                    .map((item) => {
                      return item.rate;
                    })
                    .reduce((total, rate) => total + rate, 0) /
                    item.reviews.length || 0}
                  <FaStar style={{ color: "#faad14" }} />
                </h2>
                &nbsp; || &nbsp;
                <h2 style={{ fontFamily: "cursive" }}>
                  {item.reviews.length}
                  <FaCommentDots style={{ color: "#8c8c8c" }} />
                </h2>
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
              </div>
              <Row gutter={(16, 16)}>
                <Col md={{ span: 10, order: 1 }} xs={{ span: 12, order: 1 }}>
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
                <Col md={{ span: 14, order: 1 }} xs={{ span: 12, order: 1 }}>
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
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row gutter={[16, 16]}>
                    <Col
                      md={{ span: 12, order: 1 }}
                      xs={{ span: 24, order: 1 }}
                    >
                      <Button
                        type="primary"
                        block
                        danger
                        onClick={() => navigate(`/pitch/${item.id}/setpitch`)}
                      >
                        Chi tiết
                      </Button>
                    </Col>
                    <Col
                      md={{ span: 12, order: 1 }}
                      xs={{ span: 24, order: 2 }}
                    >
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
                </Col>
              </Row>
            </Col>
            {/* </div> */}
          </Row>
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
                  margin: "16px 0 32px 0",
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
                          src={search}
                          alt=""
                          style={{ height: "50px", width: "50px" }}
                        />
                        <h1>Tìm kiếm</h1>
                      </div>

                      <Col span={24}>
                        <Form.Item
                          label=""
                          name="date"
                          /*   rules={[
                            {
                              required: true,
                              message: "Bạn chưa chọn ngày!",
                            },
                          ]} */
                        >
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
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={{ span: 24, order: 2 }}
                    xs={{ span: 24, order: 1 }}
                    style={{
                      border: " 1px solid white",
                      backgroundColor: " white",
                      boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                      borderRadius: 5,
                      padding: "15px 35px",
                    }}
                  >
                    <Row gutter={[16, 16]}>
                      <div style={{ marginBottom: 16 }}>
                        <Col>
                          <Space>
                            {renderFilterTimeShoot()}
                            {renderFilterTeam()}
                            {filterParams.keyword && (
                              <Tag
                                closable
                                onClose={() => handleClearKeywordFilter()}
                              >
                                Keyword: {filterParams.keyword}
                              </Tag>
                            )}
                          </Space>
                        </Col>
                      </div>
                    </Row>
                    <Row
                      gutter={[24, 24]}
                      style={{ marginBottom: 16, padding: 16 }}
                    >
                      <Col
                        Col
                        md={6}
                        xs={24}
                        style={{
                          border: " 1px solid white",
                          backgroundColor: " white",
                          boxShadow: "rgb(0 0 0 / 50%) -1px 1px 8px",
                          borderRadius: 5,
                        }}
                      >
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

                        <Checkbox.Group
                          onChange={(value) => handleFilter("teamId", value)}
                          value={filterParams.teamId}
                        >
                          <Row>
                            <h3>Lọc Theo</h3>
                            {renderTeamOptions()}
                          </Row>
                        </Checkbox.Group>
                      </Col>
                      <Col md={18} xs={24}>
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
