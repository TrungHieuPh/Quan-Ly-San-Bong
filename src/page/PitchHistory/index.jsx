import { Form, Button, Input, Card, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { FaBook } from "react-icons/fa";

import * as S from "./styles";
/* import goal from "../../../Images/goal.gif"; */

function PitchHistory() {
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
        <S.TitleContent>
          <FaBook />
          <h1>Lịch Sử Đặt Sân</h1>
          {/* <Button onClick={() => navigate(`/datsan/createpitch`)}>
            Create
          </Button> */}
        </S.TitleContent>
        <div>
          {/*  <S.ListWrapper> {renderPitch()}</S.ListWrapper> */}
          <div>abc</div>
        </div>
      </div>
      {/* <Space style={{ marginTop: 8 }}>
          <Button onClick={() => navigate(`/product/${item.id}`)}>
            Chi tiết
          </Button>
        </Space> */}
    </S.Wrapper>
  );
}
export default PitchHistory;
