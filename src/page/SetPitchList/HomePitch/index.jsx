import {
  Button,
  Card,
  Space,
  Input,
  Row,
  Col,
  Select,
  Tag,
  Slider,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { generatePath, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getPitchListAction } from "../../../redux/actions";
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
    sortFilter: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pitch } = useSelector((state) => state.product);

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
    console.log(value);
    setFilterParams({
      ...filterParams,
      sortFilter: value,
    });
    dispatch(
      getPitchListAction({
        ...filterParams,
        limit: PITCH_LIST_LIMIT,
        page: 1,
        sortFilter: value,
      })
    );
  };
  const renderPitch = () => {
    return pitch.data.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Link to={generatePath(ROUTES.USER.SET_PITCH, { id: item.id })}>
            <Card
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
            <Card size="small" title="Giá">
              {/*  <S.FilterContainer>
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
              </S.FilterContainer> */}
            </Card>
          </Col>
          <Col span={18}>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Input
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
              {filterParams.keyword && (
                <Tag closable onClose={() => handleClearKeywordFilter()}>
                  Keyword: {filterParams.keyword}
                </Tag>
              )}
            </Space>
            <Row gutter={[16, 16]}>{renderPitch()}</Row>
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
