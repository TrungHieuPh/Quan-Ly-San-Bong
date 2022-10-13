import { Form, Button, Input, Card, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { FaCalendarPlus } from "react-icons/fa";

import { getPitchListAction } from "../../../redux/actions";
import * as S from "./styles";
import ball from "../../../Images/ball.gif";

function DatSan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pitch } = useSelector((state) => state.product);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  useEffect(() => {
    dispatch(getPitchListAction());
  }, []);
  const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      console.log(pitch.data, "HOmePitch");
      return (
        <Card size="small" style={{ marginTop: 16 }}>
          <S.TitleItem>
            <img src={ball} style={{ width: 35, height: 35 }} />
            <Button
              type="link"
              onClick={() => navigate(`/pitch/${item.id}/setPitch`)}
            >
              {item.name}
            </Button>
          </S.TitleItem>

          <hr></hr>
          <h5>{item.title}</h5>
          <h6>{item.address}</h6>
          <h6>{item.date}</h6>

          {/* <Button onClick={() => navigate(`/datsan/${item.id}/setPitch`)}>
            Dat san
          </Button> */}
        </Card>
      );
    });
  };
  return (
    <S.Wrapper>
      <S.TopWrapper></S.TopWrapper>

      <Card size="small" style={{ marginTop: 16, zwordWrap: "break-word" }}>
        <S.TitleContent>
          <FaCalendarPlus />
          <h1>Thông tin Sân</h1>
        </S.TitleContent>
        <div style={{ display: "flex" }}>
          <S.ListWrapper> {renderPitch()}</S.ListWrapper>
          <div>abc</div>
        </div>

        {/* <Space style={{ marginTop: 8 }}>
          <Button onClick={() => navigate(`/product/${item.id}`)}>
            Chi tiết
          </Button>
        </Space> */}
      </Card>
    </S.Wrapper>
  );
}
export default DatSan;
