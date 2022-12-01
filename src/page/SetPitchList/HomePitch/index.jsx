import {
  Button,
  Space,
  Input,
  Row,
  Col,
  Select,
  Tag,
  Form,
  Spin,
  Checkbox,
  message,
  notification,
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
  getTeamListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import search from "../../../Images/search.gif";
import locations from "../../../Images/locations.gif";
import yuan from "../../../Images/yuan.gif";
import note from "../../../Images/note.gif";
import flag from "../../../Images/flag.gif";
import stopwatch from "../../../Images/stopwatch.gif";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import { FaCommentDots, FaStar, FaHeart } from "react-icons/fa";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitch } = useSelector((state) => state.product);
  const { teamList } = useSelector((state) => state.team);

  const { userInfo } = useSelector((state) => state.user);
  const { timeShootList } = useSelector((state) => state.timeShoot);

  const info = () => {
    message.info("Bạn cần đăng nhập để đặt sân");
  };
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
    console.log(filterParams, "handleFilter");
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
          style={{
            padding: "4px 8px",
            fontSize: 14,
            backgroundColor: "white",
            borderRadius: 6,
          }}
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
          style={{
            padding: "4px 8px",
            fontSize: 14,
            backgroundColor: "white",
            borderRadius: 6,
          }}
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

  const renderPitchList = () => {
    return pitch.data.map((item) => {
      return (
        <Col xs={24} key={item.id}>
          <S.ItemWrapperPitch>
            <Row gutter={[16, 16]}>
              <Col md={7} xs={24}>
                <S.ItemImage
                  key={item.images[0]?.id}
                  src={item.images[0]?.url}
                  alt={item.images[0]?.name}
                />
              </Col>
              <Col md={17} xs={24}>
                <div>
                  <Space>
                    <img src={flag} alt="" style={{ height: 42, width: 42 }} />
                    <h2
                      style={{ fontSize: 28, fontWeight: 900, marginBottom: 0 }}
                    >
                      {item.name}
                    </h2>
                    <S.team>{item.team.name}</S.team>
                  </Space>
                </div>
                <Row gutter={[16, 16]}>
                  <Col md={12} xs={24}>
                    <div>
                      <Space>
                        <img
                          src={locations}
                          style={{
                            width: 24,
                            height: 24,
                          }}
                          alt=""
                        />
                        <h3
                          style={{
                            fontSize: 16,
                            color: "#a8071a",
                            marginBottom: 0,
                          }}
                        >
                          Địa chỉ: {item.address}
                        </h3>
                      </Space>
                    </div>
                    <div>
                      <Space>
                        <img
                          src={stopwatch}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          alt=""
                        />
                        <h3
                          style={{
                            fontSize: 16,
                            color: "#a8071a",
                            marginBottom: 0,
                          }}
                        >
                          Khung giờ:
                        </h3>
                      </Space>
                      <div>
                        {item.times?.map((itemTime) => {
                          return (
                            <Tag size="small" style={{ color: "#003a8c" }}>
                              {itemTime.name}
                            </Tag>
                          );
                        })}
                      </div>
                    </div>
                    <Space size={32} style={{ marginTop: 16 }}>
                      <Space align="baseline">
                        <FaStar style={{ fontSize: 20, color: "#faad14" }} />
                        <h2 style={{ fontFamily: "cursive", marginBottom: 0 }}>
                          {item.reviews
                            .map((item) => {
                              return item.rate;
                            })
                            .reduce((total, rate) => total + rate, 0) /
                            item.reviews.length || 0}
                        </h2>
                      </Space>
                      <Space align="baseline">
                        <FaCommentDots
                          style={{ fontSize: 20, color: "#8c8c8c" }}
                        />
                        <h2 style={{ fontFamily: "cursive", marginBottom: 0 }}>
                          {item.reviews.length}
                        </h2>
                      </Space>
                      <Space align="baseline">
                        <FaHeart style={{ fontSize: 20, color: "#f5222d" }} />
                        <h2 style={{ fontFamily: "cursive", marginBottom: 0 }}>
                          {item.favorites.length}
                        </h2>
                      </Space>
                    </Space>
                  </Col>
                  <Col md={12} xs={24}>
                    <S.ItemPrice>
                      <h6 style={{ color: "#003a8c" }}>Giá chỉ từ:</h6>
                      <S.itemPricePitch>
                        <img
                          src={yuan}
                          style={{
                            width: 50,
                            height: 50,
                          }}
                          alt=""
                        />
                        {parseFloat(item.price).toLocaleString()}đ
                      </S.itemPricePitch>
                    </S.ItemPrice>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col md={12} xs={24}>
                    <Button
                      type="primary"
                      block
                      danger
                      onClick={() => navigate(`/pitch/${item.id}/setpitch`)}
                    >
                      Chi tiết
                    </Button>
                  </Col>
                  <Col md={12} xs={24}>
                    <Button
                      type="primary"
                      block
                      danger
                      onClick={() => {
                        userInfo.data.id
                          ? navigate(
                              generatePath(ROUTES.USER.CHECKOUT, {
                                id: item.id,
                              })
                            )
                          : notification.warn({ message: "Bạn cần đăng nhập" });
                      }}
                    >
                      Đặt sân
                    </Button>
                  </Col>
                </Row>
              </Col>
              {/* </div> */}
            </Row>
          </S.ItemWrapperPitch>
        </Col>
      );
    });
  };

  return (
    <S.Wrapper>
      <S.TitleContent>
        <img src={note} alt="" style={{ height: 56, width: 56 }} />
        <h1
          style={{
            color: " #a8071a",
            fontFamily: "monospace",
            fontSize: 36,
          }}
        >
          Thông tin Sân
        </h1>
      </S.TitleContent>
      <Row gutter={[24, 24]}>
        <Col lg={6} xs={24}>
          <S.FilterWrapper>
            <h2>Sắp xếp theo</h2>
            <S.SelectPriceFilter
              placeholder="Sắp xếp theo"
              allowClear
              onChange={(value) => handleChangeSort(value)}
            >
              <Select.Option value="asc">Giá tăng dần </Select.Option>
              <Select.Option value="desc">Giá giảm dần</Select.Option>
            </S.SelectPriceFilter>
            <h2 style={{ marginTop: 16 }}>Lọc Theo</h2>
            <Checkbox.Group
              onChange={(value) => handleFilter("teamId", value)}
              value={filterParams.teamId}
            >
              <Row>{renderTeamOptions()}</Row>
            </Checkbox.Group>
          </S.FilterWrapper>
        </Col>
        <Col lg={18} xs={24}>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <S.WrapperContent>
                <h2>Tìm kiếm</h2>
                <Input
                  placeholder="Nhập từ khóa tìm kiếm"
                  onChange={(e) => handleFilter("keyword", e.target.value)}
                  value={filterParams.keyword}
                  prefix={<SearchOutlined />}
                  style={{ width: "100%" }}
                />
              </S.WrapperContent>
            </Col>
            {(filterParams.keyword ||
              !!filterParams.teamId.length ||
              !!filterParams.timeShootId.length) && (
              <Col xs={24}>
                <Space>
                  {renderFilterTimeShoot()}
                  {renderFilterTeam()}
                  {filterParams.keyword && (
                    <Tag
                      style={{
                        padding: "4px 8px",
                        fontSize: 14,
                        backgroundColor: "white",
                        borderRadius: 6,
                      }}
                      closable
                      onClose={() => handleClearKeywordFilter()}
                    >
                      Từ khóa: {filterParams.keyword}
                    </Tag>
                  )}
                </Space>
              </Col>
            )}

            <Col xs={24}>
              <Spin spinning={pitch.loading}>
                <Row gutter={[24, 24]}>{renderPitchList()}</Row>

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
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </S.Wrapper>
  );
}
export default HomePitch;
