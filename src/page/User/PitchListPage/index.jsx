import { Row, Col, Card, Table, Button, Space, Pagination, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import * as S from "./styles";
import { getPitchListAction } from "../../../redux/actions";
import pitchReducers from "../../../redux/reducers/pitch.reducer";

const UserPitchList = () => {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(pitch, "abc");
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

  const handleShowMore = () => {
    dispatch(
      getPitchListAction({
        params: {
          page: pitch.meta.page + 1,
          limit: PITCH_LIST_LIMIT,
        },
        more: true,
      })
    );
  };

  const renderPitchList = () => {
    return pitch.data.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Card size="small" title={item.name}>
            {item.price.toLocaleString()}
          </Card>
        </Col>
      );
    });
  };

  return (
    <S.Wrapper>
      <Row>
        <Col span={6}>
          <Card size="small">Filter</Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>{renderPitchList()}</Row>
          {pitch.data.length !== pitch.meta.total && (
            <Row justify="center">
              <Button style={{ margin: 16 }} onClick={() => handleShowMore()}>
                Show More
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.Wrapper>
  );
};
export default UserPitchList;
