import { Button, Card } from "antd";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd-notifications-messages";

import {
  FaSmile,
  FaFrown,
  FaMeh,
  FaCommentDots,
  FaFile,
  FaCalendarDay,
  FaSignal,
  FaUserPlus,
  FaPeopleArrows,
  FaCheckCircle,
} from "react-icons/fa";

import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";
import document from "../../../Images/document.gif";

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
    /*   show(); */
    navigate("/datsan/:id/setpitch/detail");
  };

  return (
    <S.Wrapper>
      <S.Main>
        <S.Left>
          <S.SideProfile>
            <div className="main">
              <span>Đánh Giá Toàn Diện </span>
              <div>+674,5</div>
            </div>
            <div className="sub">
              Đánh giá tích cực
              <span> 98%</span>
            </div>
            <ul>
              <li className="good">
                <FaSmile />
                <span>100</span>
              </li>
              <li className="meh">
                <FaMeh />
                <span>14</span>
              </li>
              <li className="bad">
                <FaFrown />
                <span>3</span>
              </li>
            </ul>
          </S.SideProfile>
          <S.LeftMenu>
            <ul className="arrows">
              <li>
                <a href="#">
                  <FaCommentDots />
                  <span> Gửi tin nhắn!</span>
                </a>
              </li>
            </ul>
            <ul className="arrowsbot">
              <li>
                <a href="#" className="selected">
                  <FaFile />
                  <span>Hồ sơ</span>
                </a>
              </li>
              <li>
                <a>
                  <FaCalendarDay />
                  <span>Lịch trình (Tham dự)</span>
                </a>
              </li>
              <li>
                <a>
                  <FaSignal />
                  <span>Điều chỉnh</span>
                </a>
              </li>

              <li>
                <a>
                  <FaUserPlus />
                  <span>Tuyển dụng</span>
                </a>
              </li>
              <li>
                <a>
                  <FaPeopleArrows />
                  <span>Thành viên</span>
                </a>
              </li>
              <li>
                <a>
                  <FaCheckCircle />
                  <span>Đánh giá</span>
                </a>
              </li>
            </ul>
          </S.LeftMenu>
        </S.Left>
        <S.Center>
          <S.BgTitle>
            <h1>{detailPitch?.name}</h1>
          </S.BgTitle>
          <S.DetailsThs>
            <img src={document} />
            Hồ sơ của {detailPitch?.name}
          </S.DetailsThs>
          <S.Details>
            <S.DetailsTBody>
              <S.DetailsTr>
                <S.DetailsTh>Tiêu đề</S.DetailsTh>
                <S.DetailsTd>{detailPitch?.title}</S.DetailsTd>
              </S.DetailsTr>
              <S.DetailsTr>
                <S.DetailsTh>Giá</S.DetailsTh>
                <S.DetailsTd>{detailPitch?.price}</S.DetailsTd>
              </S.DetailsTr>
              <S.DetailsTr>
                <S.DetailsTh>Địa chỉ </S.DetailsTh>
                <S.DetailsTd>{detailPitch?.adress}</S.DetailsTd>
              </S.DetailsTr>
              <S.DetailsTr>
                <S.DetailsTh>Nội dung </S.DetailsTh>
                <S.DetailsTd>{detailPitch?.content}</S.DetailsTd>
              </S.DetailsTr>
              <S.DetailsTr>
                <S.DetailsTh>Ngày tạo sân</S.DetailsTh>
                <S.DetailsTd>{detailPitch?.date}</S.DetailsTd>
              </S.DetailsTr>
              <S.DetailsTr>
                <S.DetailsTh>ảnh</S.DetailsTh>
                <S.DetailsTd>
                  <img src={detailPitch.upload}></img>
                </S.DetailsTd>
              </S.DetailsTr>
            </S.DetailsTBody>
          </S.Details>

          <div>
            {/*         <Button onClick={() => navigate(-1)}>Back</Button> */}
            <Button
              type="primary"
              onClick={() => handleSetPitch("success")}
              danger
              block
            >
              Đặt sân
            </Button>
          </div>
        </S.Center>
        <S.RightMenu>
          <img src="https://cdn.tgdd.vn/2020/08/content/1-800x450-126.jpg"></img>
        </S.RightMenu>
      </S.Main>
    </S.Wrapper>
  );
}

export default SetPitch;
