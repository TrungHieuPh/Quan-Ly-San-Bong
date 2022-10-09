import { Form, Button, Input, Card, Space } from "antd";

import { useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPitchListAction } from "../../../redux/actions";
import * as S from "./styles";

function DatSan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pitch } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getPitchListAction());
  }, []);
  const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      return (
        <Card size="small" style={{ marginTop: 16 }}>
          <Space style={{ marginTop: 8 }}>
            <h3>{item.name}</h3>
            <h5>{item.title}</h5>
          </Space>
          <Button onClick={() => navigate(`/datsan/${item.id}/setPitch`)}>
            Dat san
          </Button>
        </Card>
      );
    });
  };
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h1>Timestamped Notes App</h1>
        <Button onClick={() => navigate(`/datsan/createpitch`)}>Create</Button>
      </S.TopWrapper>
      <Card size="small" style={{ marginTop: 16 }}>
        <S.ListWrapper> {renderPitch()}</S.ListWrapper>
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
