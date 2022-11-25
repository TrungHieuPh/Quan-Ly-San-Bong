import {
  Button,
  Space,
  Form,
  Spin,
  Input,
  Rate,
  notification,
  Col,
  Card,
  Row,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  generatePath,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ROUTES } from "../../../constants/routers";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaUser, FaGripLinesVertical, FaArrowLeft } from "react-icons/fa";

import * as S from "./styles";
import document from "../../../Images/document.gif";
import mouse from "../../../Images/mouse.gif";
import click from "../../../Images/click.gif";

import yuan from "../../../Images/yuan.gif";
import image from "../../../Images/image.gif";
import pencil from "../../../Images/pencil.gif";
import conversation from "../../../Images/conversation.gif";
import { FaStar } from "react-icons/fa";

import {
  getPitchDetailAction,
  bookingPitchAction,
  getOderListAction,
  favoritePitchAction,
  getReviewListAction,
  unFavoritePitchAction,
  postReviewAction,
  deleteReviewAction,
} from "../../../redux/actions";
function SetPitch() {
  const [selectedOption, setSelectedOption] = useState();
  const [dateSelected, setDateSelected] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { reviewList } = useSelector((state) => state.review);

  const { pitchDetail } = useSelector((state) => state.product);

  const { bookingList } = useSelector((state) => state.booking);

  //kiểm tra đã đăng nhập chưa
  const isLike = userInfo.data.id
    ? pitchDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;
  const isReview = userInfo.data.id
    ? pitchDetail.data.reviews?.some((item) => item.userId === userInfo.data.id)
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
  const handleBlockComment = () => {
    let isDisabled = false;

    Array.from(bookingList.data).forEach((item) => {
      if (item.userId === userInfo.data.id && parseInt(id) === item.pitchId) {
        isDisabled = true;
      }
    });
    return (
      <>
        {isDisabled && (
          <Button
            type="primary"
            style={{ Background: "#003a8c" }}
            htmlType="submit"
            block
          >
            Đăng bình luận
          </Button>
        )}
        {!isDisabled && (
          <Button
            disabled
            type="primary"
            style={{ Background: "#003a8c" }}
            htmlType="submit"
            block
          >
            Đăng bình luận
          </Button>
        )}
      </>
    );
  };

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
              pitchName: pitchDetail.data.name,
            })
          );
        }
      } else {
        dispatch(
          favoritePitchAction({
            userId: userInfo.data.id,
            pitchId: pitchDetail.data.id,
            pitchName: pitchDetail.data.name,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const handlePostReview = (values) => {
    if (userInfo.data.id) {
      if (isReview) {
        const ReviewData = pitchDetail.data.reviews?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (ReviewData) {
          notification.warn({ message: "Bạn đã bình luận rồi" });
        }
      } else {
        dispatch(
          postReviewAction({
            ...values,
            userId: userInfo.data.id,
            pitchId: pitchDetail.data.id,
            pitchName: pitchDetail.data.name,
          })
        );
        window.location.reload();
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  /*   const handleDeleteReview = (id) => {
    const ReviewIndex = reviewList.data?.findIndex((item) => item.id === id);
    console.log(id);
    dispatch(deleteReviewAction({ id: id }));
  }; */
  const renderReviewList = () => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      if (parseInt(item.pitchId) === parseInt(id))
        return (
          <div
            style={{
              padding: "16px 0",
              borderBottom: ".5px solid #e0dddd8f",
              color: "#003a8c",
            }}
          >
            <Space align="center">
              <FaUser style={{ color: "#ab0f21" }} />
              <h3 style={{ marginBottom: 0 }}>{item.user.fullName}</h3>
              {userInfo.data.id === item.userId && (
                <Popconfirm
                  title="Bạn có chắc muốn xóa sản phẩm này không?"
                  onConfirm={() => {
                    userInfo.data.id
                      ? dispatch(deleteReviewAction({ id: item.id }))
                      : notification.warn({ message: "Bạn cần đăng nhập" });
                  }}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    size={10}
                    type="link"
                  ></Button>
                </Popconfirm>
              )}

              <div style={{ color: "#003a8c" }}>
                {moment(item.createdAt).fromNow()}
              </div>
            </Space>
            <div>
              <Rate value={item.rate} disabled style={{ fontSize: 14 }} />
            </div>
            <div>{item.comment}</div>
          </div>
        );
    });
  };

  const renderProductImages = useMemo(() => {
    if (!pitchDetail.data.images?.length) return null;
    return pitchDetail.data.images?.map((item) => {
      return (
        <Col xs={24} key={item.id}>
          <img
            src={item.url}
            alt={item.name}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Col>
      );
    });
  }, [pitchDetail.data]);

  return (
    <S.Wrapper>
      <S.Main>
        <S.BgTitle>
          <S.TitlePanner>{pitchDetail.data?.name}</S.TitlePanner>
        </S.BgTitle>

        <Spin spinning={pitchDetail.loading} style={{ width: "100%" }}>
          <S.SearchBooking>
            <Row gutter={[16, 16]}>
              <Col lg={5} xs={12}>
                <S.TotalRating>
                  <div
                    style={{
                      fontSize: 20,
                      color: "#003a8c",
                    }}
                  >
                    Đánh giá
                  </div>
                  <div
                    style={{
                      fontSize: 25,
                      fontFamily: "monospace",
                      display: "flex",
                      alignItems: "center",
                      color: "#a8071a",
                    }}
                  >
                    {countAverageRating.toFixed(1)}/5.0
                    <FaStar
                      style={{
                        width: 24,
                        height: 24,
                        color: "#faad14",
                        marginLeft: 8,
                      }}
                      alt=""
                    />
                  </div>
                </S.TotalRating>
              </Col>
              <Col lg={5} xs={12}>
                <Button
                  size="large"
                  danger={isLike}
                  bordered="false"
                  onClick={() => handleToggleFavorite()}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    backgroundColor: "whitesmoke",
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: "#003a8c",
                    }}
                  >
                    Yêu thích
                  </div>
                  <Space>
                    {isLike ? <HeartFilled /> : <HeartOutlined />}
                    {pitchDetail.data?.favorites?.length || 0} lượt
                    <img
                      src={mouse}
                      style={{
                        width: 60,
                        height: 60,
                        position: "relative",
                        transform: "rotate(-30deg)",
                      }}
                      alt=""
                    />
                  </Space>
                </Button>
              </Col>
              <Col
                lg={7}
                md={12}
                xs={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <S.priceFrom>
                  <div style={{ fontSize: 20, color: "#003a8c" }}>
                    Giá chỉ từ
                  </div>
                  <S.ItemIconContent>
                    <img
                      src={yuan}
                      style={{
                        width: 64,
                        height: 64,
                      }}
                      alt=""
                    />
                    <S.ItemPrice>
                      &nbsp;&nbsp;
                      {parseFloat(pitchDetail.data.price).toLocaleString()}
                      <div style={{ fontSize: 25 }}>&nbsp;đ</div>
                    </S.ItemPrice>
                  </S.ItemIconContent>
                </S.priceFrom>
              </Col>
              <Col lg={7} md={12} xs={24}>
                {userInfo.data.id && (
                  <S.ButtonSetPitch
                    style={{
                      fontSize: 24,
                      backgroundColor: "whitesmoke",
                    }}
                    size="large"
                    type="link"
                    danger
                    block
                    onClick={() =>
                      navigate(generatePath(ROUTES.USER.CHECKOUT, { id }))
                    }
                  >
                    <div
                      style={{
                        width: "100%",
                        margin: "5px 0px 5px 1px",
                        padding: "5px 25px 1px 5px",
                        borderRadius: " 7px",
                        color: "#003a8c",
                      }}
                    >
                      Bạn muốn đặt sân không ?
                      <h3
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "space-around",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={click}
                          style={{
                            width: 60,
                            height: 60,
                            transform: "rotate(30deg)",
                          }}
                          alt=""
                        />
                        Hãy nhấn vào đây!
                      </h3>
                    </div>
                  </S.ButtonSetPitch>
                )}
              </Col>
            </Row>
          </S.SearchBooking>
          <S.SearchBooking style={{ marginTop: 24 }}>
            <S.DetailsThs>
              <img
                src={document}
                style={{
                  width: 64,
                  height: 64,
                }}
                alt=""
              />
              <div>Hồ sơ của sân</div>
            </S.DetailsThs>
            <Row gutter={[16, 16]}>
              <Col md={12} xs={24}>
                <S.ContentRight>
                  <div
                    style={{
                      width: "100%",
                      fontSize: 20,
                      color: "#003a8c",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: pitchDetail.data.content,
                    }}
                  ></div>
                </S.ContentRight>
              </Col>
              <Col md={12} xs={24}>
                <Row gutter={[16, 16]}>{renderProductImages}</Row>
              </Col>
            </Row>
          </S.SearchBooking>

          <S.SearchBooking style={{ marginTop: 24 }}>
            <S.DetailsThs>
              <img
                src={conversation}
                style={{
                  width: 64,
                  height: 64,
                }}
                alt=""
              />
              <div>Bình luận</div>
            </S.DetailsThs>

            <div style={{ borderTop: "1px solid #ddd" }}>
              {renderReviewList()}
            </div>
            {userInfo.data.id && (
              <S.WrapperWriteComment
                size="small"
                bordered={false}
                actions={<EditOutlined />}
                title={
                  <Space>
                    <img
                      src={pencil}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      alt=""
                    />
                    <h2 style={{ margin: 0 }}>Viết bình luận tại đây !!!</h2>
                  </Space>
                }
              >
                <S.CustomForm
                  layout="vertical"
                  onFinish={(values) => handlePostReview(values)}
                >
                  <Form.Item
                    label="Đánh giá sao"
                    name="rate"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn sao!",
                      },
                    ]}
                  >
                    <Rate />
                  </Form.Item>

                  <Form.Item
                    label="Bình luận"
                    name="comment"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập nội dung!",
                      },
                      {
                        max: 50,
                        message: "bạn đã nhập quá ký tự!",
                      },
                    ]}
                  >
                    <Input.TextArea autoSize={{ maxRows: 6, minRows: 4 }} />
                  </Form.Item>

                  {/*  <Button
                          type="primary"
                          style={{ Background: "#003a8c" }}
                          htmlType="submit"
                          block
                        >
                          Đăng bình luận
                        </Button> */}
                  {handleBlockComment()}
                </S.CustomForm>
              </S.WrapperWriteComment>
            )}
          </S.SearchBooking>
        </Spin>
      </S.Main>
    </S.Wrapper>
  );
}

export default SetPitch;
