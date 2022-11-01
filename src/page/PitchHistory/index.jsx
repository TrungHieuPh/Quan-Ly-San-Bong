import { Form, Button, Input, Card, Space, Col, Dropdown, Menu } from "antd";
import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, Link, Navigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { FaBook } from "react-icons/fa";
import { getOderListAction } from "../../redux/actions";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";
import { ROUTES } from "../../constants/routers";

import * as S from "./styles";
/* import goal from "../../../Images/goal.gif"; */

function PitchHistory() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingList } = useSelector((state) => state.booking);

  const accessToken = localStorage.getItem("accessToken");

  const renderOrderHistory = () => {
    return bookingList.data?.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Card
            title={item.pitchs.name}
            size="small"
            style={{ fontSize: "20px" }}
          >
            <h5> {item.pitchs.name}</h5>
            <h5> {item.pitchs.price}</h5>
            <h5> {item.pitchs.name}</h5>
            <h5> {item.pitchs.name}</h5>
          </Card>
        </Col>
      );
    });
  };

  useEffect(() => {
    /*   if (!accessToken) {
      return <h3 style={{ color: "black" }}>Chưa có lịch sử giao dịch </h3>;
    } else { */
    dispatch(
      getOderListAction({
        params: {
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );

    /*     dispatch(getTimeShootListAction()); */
  }, []);
  return (
    <S.Wrapper>
      <S.TopWrapper></S.TopWrapper>

      <div
        style={{
          marginTop: 16,
          wordWrap: "break-word",
          display: "flex",
          justifyContent: " space-around",
          alignItems: "center",
        }}
      >
        <div>
          <S.TitleContent>
            <FaBook />
            <h1>Lịch Sử Đặt Sân</h1>
          </S.TitleContent>
          {/* 
          
          <div style={{ width: 500 }}> {renderOrderHistory()}</div> */}
          {userInfo.data.fullName ? (
            <Space>
              <div style={{ color: "black" }}>{renderOrderHistory()}</div>
            </Space>
          ) : (
            <div>Bạn chưa đăng nhập</div>
          )}
        </div>
      </div>
    </S.Wrapper>
  );
}
export default PitchHistory;
