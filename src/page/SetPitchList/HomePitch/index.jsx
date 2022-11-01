import {
  Button,
  Card,
  Space,
  Input,
  Row,
  Col,
  Select,
  Tag,
  Checkbox,
  Radio,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { generatePath, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import pitchs from "../../../Images/pitchs.jpg";
import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import { FaCalendarPlus, FaCalendarMinus, FaDollarSign } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import Moment from "react-moment";

function HomePitch() {
  const [filterParams, setFilterParams] = useState({
    keyword: "",
    price: [0, 10000000],
    sortFilter: "",
    timeShootId: [],
  });

  const dispatch = useDispatch();

  const { pitch } = useSelector((state) => state.product);
  const { timeShootList } = useSelector((state) => state.timeShoot);
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

  const renderTimeShootOptions = () => {
    return timeShootList.data.map((item, index) => {
      return (
        <Col span={24} key={item.id}>
          <Select.Option value={item.id}>{item.name}</Select.Option>
        </Col>
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

  const renderPitchList = () => {
    return pitch.data.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Link to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: item.id })}>
            <Card
              title={item.name}
              size="small"
              style={{ fontSize: "20px" }}
              cover={<img alt="example" src={pitchs} />}
              /*   actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]} */
            >
              <h3> {item.name}</h3>
              <h5>
                <FaDollarSign />
                {parseFloat(item.price).toLocaleString()} VNĐ
              </h5>
              <h5>
                <FaCalendarMinus />
                <Moment format="DD/MM/YYYY" date={item.date} />
              </h5>
            </Card>
          </Link>
        </Col>
      );
    });
  };

  return (
    <S.Wrapper>
      {/*  <S.TopWrapper></S.TopWrapper> */}
      <Card size="small" style={{ marginTop: 16, zwordWrap: "break-word" }}>
        <S.TitleContent>
          <FaCalendarPlus />
          <h1>Thông tin Sân</h1>
        </S.TitleContent>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card size="small" title="Filter">
              <h4>TimeShoot</h4>
              <Space style={{ marginBottom: 16 }}>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => handleFilter(value)}
                  value={renderTimeShootOptions}
                ></Select>
              </Space>
            </Card>
          </Col>
          {/* <Col span={6}>
            <Card size="small" title="Giá">
                <S.FilterContainer>
                <S.FilterTitle>Giá</S.FilterTitle>
                <div style={{ padding: "0 8px" }}>
                  <Slider
                    range
                    min={DEFAULT_PRICE_FILTER[0]}
                    max={DEFAULT_PRICE_FILTER[1]}
                    step={1000000}
                    value={priceFilter}
                    tipFormatter={(value) => value.toLocaleString()}
                    onChange={(value) => handleChangePriceFilter(value)}
                  />  
                </div>
              </S.FilterContainer> 
            </Card>
          </Col> */}
          <Col span={18}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={16}>
                <Input
                  placeholder="Nhập từ khóa tìm kiếm"
                  onChange={(e) => handleFilter("keyword", e.target.value)}
                  value={filterParams.keyword}
                  prefix={<SearchOutlined />}
                />
              </Col>
              <Col span={8}>
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
            </Row>
            <Space style={{ marginBottom: 16 }}>
              {renderFilterTimeShoot()}
              {filterParams.keyword && (
                <Tag closable onClose={() => handleClearKeywordFilter()}>
                  Keyword: {filterParams.keyword}
                </Tag>
              )}
            </Space>
            <Row gutter={[16, 16]}>{renderPitchList()}</Row>
            {pitch.data.length !== pitch.meta.total && (
              <Row justify="center">
                <Button style={{ margin: 16 }} onClick={() => handleShowMore()}>
                  Xem Thêm
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </Card>
    </S.Wrapper>
  );
}
export default HomePitch;
