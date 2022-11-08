import {
  Button,
  Space,
  Form,
  DatePicker,
  Drawer,
  Descriptions,
  PageHeader,
  Statistic,
  Select,
  Tabs,
  Spin,
  Input,
  Rate,
  notification,
  Col,
  Card,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  Link,
  generatePath,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { ROUTES } from "../../../constants/routers";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";

import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";
import document from "../../../Images/document.gif";
import click from "../../../Images/click.gif";
import wink from "../../../Images/wink.gif";
import signposts from "../../../Images/signposts.gif";
import image from "../../../Images/image.gif";
import pencil from "../../../Images/pencil.gif";
import chat from "../../../Images/chat.gif";
import favorite from "../../../Images/favorite.gif";
import { FaStar } from "react-icons/fa";

import {
  getPitchDetailAction,
  bookingPitchAction,
  getOderListAction,
  favoritePitchAction,
  getReviewListAction,
  unFavoritePitchAction,
  postReviewAction,
} from "../../../redux/actions";
function SetPitch() {
  const [selectedOption, setSelectedOption] = useState();
  const [dateSelected, setDateSelected] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviewList } = useSelector((state) => state.review);
  const { pitchDetail } = useSelector((state) => state.product);
  const { pitch } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);

  //kiểm tra đã đăng nhập chưa
  const isLike = userInfo.data.id
    ? pitchDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
    dispatch(getReviewListAction({ pitchId: id }));
    dispatch(getOderListAction({ id: id }));
  }, [id]);

  const avengerRating = reviewList.data
    .map((item) => item.rate)
    .reduce((total, rate) => total + rate, 0);
  const countAverageRating = avengerRating / reviewList.data.length || 0;

  /*  const showAverageRating = () => {
   return reviewList.data?.map((itemRate) => {
     return {itemRate.rate}
   })
 }; */

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = pitchDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoritePitchAction({
              id: favoriteData.id,
              pitchId: pitchDetail.data.id,
            })
          );
        }
      } else {
        dispatch(
          favoritePitchAction({
            userId: userInfo.data.id,
            pitchId: pitchDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const handlePostReview = (values) => {
    console.log(values, "cmt");
    dispatch(
      postReviewAction({
        ...values,
        userId: userInfo.data.id,
        productId: pitchDetail.data.id,
      })
    );
  };

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      if (parseInt(item.productId) === parseInt(id))
        return (
          <div style={{ margin: 16, borderBottom: ".2px solid #e0dddd8f" }}>
            <Space>
              <h3>
                <FaUser />
                {item.user.fullName}
              </h3>
              <h4>{moment(item.createdAt).fromNow()}</h4>
            </Space>
            <div>
              <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
            </div>
            <div>{item.comment}</div>
          </div>
        );
    });
  }, [reviewList.data]);

  const renderProductImages = useMemo(() => {
    if (!pitchDetail.data.images?.length) return null;
    return pitchDetail.data.images?.map((item) => {
      return (
        <img
          key={item.id}
          src={item.url}
          alt={item.name}
          style={{
            width: "80%",
            height: "250px",
            margin: 16,
            objectFit: "cover",
          }}
        />
      );
    });
  }, [pitchDetail.data]);

  return (
    <S.Wrapper>
      <S.Main>
        <S.Center>
          <S.BgTitle>
            <h1 style={{ color: "#ffffff", paddingTop: 30 }}>
              {pitchDetail.data?.name}
            </h1>
            <h5 style={{ color: " wheat", position: "relative", bottom: 20 }}>
              Bóng đá | 5 sao
            </h5>
          </S.BgTitle>
        </S.Center>
        <Spin spinning={pitchDetail.loading}>
          <div>
            <div>
              <S.SearchBooking>
                <S.ButtonSetPitchHover>
                  <S.ButtonSetPitch
                    style={{
                      fontSize: 25,
                      backgroundColor: "whitesmoke",
                      boxShadow: "rgb(0 0 0 / 60%) 0px 3px 5px",
                    }}
                    size="large"
                    type="link"
                    danger
                    block
                    onClick={() =>
                      navigate(generatePath(ROUTES.USER.CHECKOUT, { id }))
                    }
                  >
                    Bạn muốn đặt sân không ?
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={wink}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        alt=""
                      />
                      Hãy nhấn vào đây!
                    </h3>
                  </S.ButtonSetPitch>
                </S.ButtonSetPitchHover>

                <div
                  style={{
                    margin: 24,
                    fontSize: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "flex-start",
                      padding: 16,
                      fontSize: 30,
                      border: " 5px solid white",
                      backgroundColor: "whitesmoke",
                      boxShadow: "rgb(0 0 0 / 60%) 0px 3px 5px",
                      height: 80,
                    }}
                  >
                    <div style={{ fontSize: 20, color: "red" }}> Đánh giá</div>
                    <div style={{ fontSize: 25, fontFamily: "monospace" }}>
                      {countAverageRating.toFixed(1)}/5
                      <FaStar
                        style={{
                          width: 30,
                          height: 30,
                          color: "#faad14",
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-around",
                    alignitems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      size="large"
                      type="link"
                      danger={isLike}
                      bordered="false"
                      icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                      onClick={() => handleToggleFavorite()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        fontSize: 30,
                        border: "5px solid white",
                        backgroundColor: "whitesmoke",
                        height: 80,
                        boxShadow: "rgb(0 0 0 / 60%) 0px 3px 5px",
                      }}
                    >
                      {pitchDetail.data?.favorites?.length || 0}
                      <img
                        src={click}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                        alt=""
                      />
                    </Button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <S.priceFrom>
                      <div style={{ fontSize: 20, color: "red" }}>
                        Giá chỉ từ
                      </div>
                      <div>
                        {/*  <FaDollarSign /> */}
                        <h3
                          style={{
                            display: "flex",
                            color: "#f5222d",
                            fontWeight: 700,
                          }}
                        >
                          <div style={{ fontSize: 25 }}>đ &nbsp;</div>
                          {parseFloat(
                            pitchDetail.data.price
                          ).toLocaleString()}{" "}
                          VNĐ
                        </h3>
                      </div>
                    </S.priceFrom>
                  </div>
                </div>
              </S.SearchBooking>
              <S.WrapperContent>
                <S.DetailsThs>
                  <img
                    src={document}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    alt=""
                  />
                  Hồ sơ của {pitchDetail.data?.name}
                </S.DetailsThs>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: 50,
                  }}
                >
                  <S.ContentRight>
                    <div
                      style={{ width: "100%", fontSize: 20 }}
                      dangerouslySetInnerHTML={{
                        __html: pitchDetail.data.content,
                      }}
                    ></div>
                  </S.ContentRight>
                  <S.ContentLeft>
                    <h2
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "5px solid white",
                        boxShadow: "rgb(0 0 0 / 50%) 0px 1px 2px",
                        margin: 6,
                        padding: 6,
                      }}
                    >
                      <img
                        src={image}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        alt=""
                      />
                      Hình ảnh sân
                    </h2>
                    {renderProductImages}
                  </S.ContentLeft>
                </div>
              </S.WrapperContent>
              <S.WrapperReview>
                <div style={{ display: "flex" }}>
                  <img
                    src={chat}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    alt=""
                  />
                  <h2>Bình luận</h2>
                </div>

                <div style={{ margin: 16, borderTop: "1px solid #ddd" }}>
                  {" "}
                  {renderReviewList}{" "}
                </div>
                <Col
                  span={24}
                  /*   md={{ span: 16, order: 4 }}
                  xs={{ span: 24, order: 4 }} */
                >
                  <Card
                    size="small"
                    bordered={false}
                    style={{
                      backgroundColor: " #e5e5e5",
                      border: "1px solid #820014",
                      margin: "50px 16px 16px 16px",
                      boxShadow: "rgb(0 0 0 / 50%) -1px 1px 10px",
                      borderRadius: 1,
                    }}
                    actions={<EditOutlined />}
                    title="Viết bình luận tại đây !!!"
                  >
                    {userInfo.data.id && (
                      <S.CustomForm
                        layout="vertical"
                        onFinish={(values) => handlePostReview(values)}
                      >
                        <Form.Item label="Đánh giá sao" name="rate">
                          <Rate />
                        </Form.Item>
                        <img
                          src={pencil}
                          style={{
                            width: 40,
                            height: 40,
                          }}
                          alt=""
                        />
                        <Form.Item label="Bình luận" name="comment">
                          <Input.TextArea
                            autoSize={{ maxRows: 6, minRows: 4 }}
                          />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Đăng bình luận
                        </Button>
                      </S.CustomForm>
                    )}
                  </Card>
                </Col>
              </S.WrapperReview>
            </div>
          </div>
        </Spin>
      </S.Main>
    </S.Wrapper>
  );
}

export default SetPitch;
