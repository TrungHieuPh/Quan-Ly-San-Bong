import { Button, Card } from "antd";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd-notifications-messages";

import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";

import { getPitchListAction } from "../../../redux/actions";
function SetPitch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitch } = useSelector((state) => state.product);

  const detailPitch = pitch.data.find((item, index) => {
    return item.id.toString() === id;
  });
  const show = (type) => {
    notification({
      type,
      title: "Đặt sân thành công",
      message: `Chúc mừng bạn đã đặt sân thành công ${type}`,
    });
  };
  const handleSetPitch = () => {
    show();
    navigate("/datsan");
  };

  return (
    <S.Wrapper>
      <S.BgTitle>
        <h1>{detailPitch?.name}</h1>
      </S.BgTitle>
      <S.Details>
        <S.DetailsTBody>
          <S.DetailsTr>
            <S.DetailsTh>Tieu de</S.DetailsTh>
            <S.DetailsTd>{detailPitch?.title}</S.DetailsTd>
          </S.DetailsTr>
          <S.DetailsTr>
            <S.DetailsTh>Gia</S.DetailsTh>
            <S.DetailsTd>{detailPitch?.price}</S.DetailsTd>
          </S.DetailsTr>
          <S.DetailsTr>
            <S.DetailsTh>Adress</S.DetailsTh>
            <S.DetailsTd>{detailPitch?.adress}</S.DetailsTd>
          </S.DetailsTr>
          <S.DetailsTr>
            <S.DetailsTh>Content</S.DetailsTh>
            <S.DetailsTd>{detailPitch?.content}</S.DetailsTd>
          </S.DetailsTr>
          <S.DetailsTr>
            <S.DetailsTh>Ngay Tao San</S.DetailsTh>
            <S.DetailsTd>{detailPitch?.date}</S.DetailsTd>
          </S.DetailsTr>
        </S.DetailsTBody>
      </S.Details>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <div>
        <Card size="small">
          <Button
            type="primary"
            onClick={() => handleSetPitch("success")}
            block
          >
            Đặt sân
          </Button>
        </Card>
      </div>
    </S.Wrapper>
  );
}

export default SetPitch;
