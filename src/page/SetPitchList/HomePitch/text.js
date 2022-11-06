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
} from "antd";
import React from "react";
import { useEffect, useMemo } from "react";
import { generatePath, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getPitchListAction,
  getTimeShootListAction,
} from "../../../redux/actions";
import * as S from "./styles";
import pitchs from "../../../Images/pitchs.jpg";
import calendar from "../../../Images/calendar.gif";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import { ROUTES } from "../../../constants/routers";
import {
  FaCalendarPlus,
  FaCalendarMinus,
  FaDollarSign,
  FaUnderline,
} from "react-icons/fa";
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
  console.log(filterParams.dateSelected, "function");
  /*  console.log(setFilterParams.dateSelected, "function"); */
  /*  const [dateSelected, setDateSelected] = useState(); */

  const dispatch = useDispatch();
  const [SearchForm] = Form.useForm();

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
  /*   useEffect(() => {
    if (filterParams.dateSelected === undefined) {
      SearchForm.resetFields();
     
    }
  }, [filterParams.dateSelected]); */

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
  function handleSelectedDate(values) {
    console.log(values, "values");
    setFilterParams({
      ...filterParams,
      dateSelected: moment(values).format("DD/MM/YYYY"),
    });
    /*   dispatch(
      getPitchListAction({
        params: {
          ...filterParams,
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
        dateSelected: moment(values).format("DD/MM/YYYY"),
      })
    ); */
    /*  } else {
      setFilterParams({
        ...filterParams,
        dateSelected: null,
      });
    } */
  }

  const renderPitchList = () => {
    return pitch.data.map((item) => {
      /*     if (filterParams.dateSelected !== undefined) { */
      return (
        <Col span={6} key={item.id}>
          <Link
            {...(filterParams.dateSelected == null &&
              console.log(filterParams.dateSelected))}
            to={generatePath(ROUTES.USER.PITCH_DETAIL, { id: item.id })}
          >
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
            </Card>
            <Space>
              {pitch.data.times.map((item) => {
                return (
                  /*  <Col span={24} > */
                  <Select.Option key={item.id} name="option" value={item.id}>
                    {item.name}
                  </Select.Option>
                  /*  </Col> */
                );
              })}
            </Space>
          </Link>
        </Col>
      );
      /* } else {
        return notification.open({
          message: "Notification Title",
          description: "description.",
        });
      } */
    });
  };
  const renderTimeShootOptions = useMemo(() => {
    return pitch.data.times?.map((item, index) => {
      return (
        /*  <Col span={24} > */
        <Select.Option key={item.id} name="option" value={item.id}>
          {item.name}
        </Select.Option>
        /*  </Col> */
      );
    });
  }, [pitch.data]);

  return (
    <S.Wrapper>
      <Spin spinning={pitch.loading}>
        <Card
          size="small"
          bordered="false"
          style={{
            marginTop: 16,
            wordWrap: "break-word",
            backgroundColor: "#fbcec978",
          }}
        >
          <S.TitleContent>
            <FaCalendarPlus />
            <h1>Thông tin Sân</h1>
          </S.TitleContent>
          <Form
            form={SearchForm}
            onFinish={(values) => handleSelectedDate(values)}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col
                    span={5}
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <img
                      src={calendar}
                      style={{ height: "50px", width: "50px" }}
                    />
                    <h1>Ngày đặt sân :</h1>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      label=""
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "chon ngay",
                        },
                      ]}
                    >
                      <DatePicker
                        bordered="true"
                        disabledDate={disabledDate}
                        style={{ fontSize: 30, width: "100%" }}
                        /*  defaultValue={filterParams.dateSelected} */
                        onChange={(values) => {
                          handleSelectedDate(values);
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    <Button
                      size="large"
                      danger
                      type="primary"
                      onClick={() => SearchForm.submit()}
                    >
                      Tìm kiếm
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col span={8}>
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
          </Form>
        </Card>
      </Spin>
    </S.Wrapper>
  );
}
export default HomePitch;
