import { Form, Button, Input, Card, Space, Col, Dropdown, Menu } from "antd";
import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, Link, Navigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { getOderListAction } from "../../redux/actions";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";
import { ROUTES } from "../../constants/routers";
import "antd/dist/antd.min.css";
import {
  FaFutbol,
  FaCalendarDay,
  FaCheckCircle,
  FaDollarSign,
  FaClock,
  FaBook,
} from "react-icons/fa";
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
      if (userInfo.data.id === item.userId)
        return (
          <Col span={24} key={item.id}>
            <div
              style={{
                fontSize: "20px",
                margin: 16,
                width: 1230,
                border: "1px solid #ddd",
                textAlign: "center",
                wordSpacing: "2px",
              }}
            >
              <h3 style={{ borderBottom: "1px solid #ddd", padding: 16 }}>
                <FaFutbol /> &nbsp;
                {item.pitchs.name}
              </h3>
              <div style={{ paddingLeft: 10 }}>
                <h5>
                  Giá sân: &nbsp;
                  <FaDollarSign style={{ color: "#38963F" }} />
                  {item.pitchs.price}
                </h5>
                <h5>
                  Ngày đặt sân: &nbsp;
                  <FaCalendarDay /> {item.timeSelect}
                </h5>
                <h5>
                  Khung giờ: &nbsp; <FaClock /> {item.time.name}
                </h5>
                <h5>
                  <FaCheckCircle /> &nbsp; Đã thanh toán
                </h5>
              </div>
            </div>
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
          margin: 16,
          wordWrap: "break-word",
          display: "flex",
          justifyContent: " space-around",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
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
