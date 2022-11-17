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
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ROUTES } from "../../../constants/routers";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaUser, FaGripLinesVertical } from "react-icons/fa";

import * as S from "./styles";
import document from "../../../Images/document.gif";
import click from "../../../Images/click.gif";
import wink from "../../../Images/wink.gif";
import yuan from "../../../Images/yuan.gif";
import image from "../../../Images/image.gif";
import pencil from "../../../Images/pencil.gif";
import conversation from "../../../Images/conversation.gif";
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
  const { pitch } = useSelector((state) => state.product);

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
  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      if (parseInt(item.pitchId) === parseInt(id))
        return (
          <div style={{ margin: 16, borderBottom: ".2px solid #e0dddd8f" }}>
            <Space align="center">
              <h3>
                <FaUser />
                {item.user.fullName}
              </h3>
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

              <div style={{ color: "#40a9ff" }}>
                {moment(item.createdAt).fromNow()}
              </div>
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
        <Row gutter={[16, 16]}>
          <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
            <S.Center>
              <S.BgTitle>
                <S.TitlePanner>{pitchDetail.data?.name}</S.TitlePanner>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5
                    style={{
                      color: "white",
                      position: "relative",
                      fontSize: 45,
                      bottom: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Bóng đá
                  </h5>
                  <h5
                    style={{
                      color: "white",
                      position: "relative",
                      fontSize: 45,
                      bottom: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaGripLinesVertical style={{ color: "#1890ff" }} />
                    {countAverageRating.toFixed()}
                    <FaStar
                      style={{
                        width: 45,
                        height: 70,
                        color: "#ffc53d",
                      }}
                      alt=""
                    />
                  </h5>
                </div>
              </S.BgTitle>
            </S.Center>
          </Col>
          <Col
            md={{ span: 24, order: 1 }}
            xs={{ span: 24, order: 2 }}
            style={{ width: "100%" }}
          >
            <Spin spinning={pitchDetail.loading} style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>
                <S.SearchBooking>
                  <Row guttet={[16, 16]}>
                    <Col md={{ span: 7, order: 1 }} xs={{ span: 24, order: 1 }}>
                      <S.ButtonSetPitch
                        style={{
                          fontSize: 25,
                          backgroundColor: "whitesmoke",
                          boxShadow: "rgb(0 0 0 / 60%) 0px 3px 5px",
                          border: "20px solid white",
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
                          }}
                        >
                          Bạn muốn đặt sân không ?
                          <h3
                            style={{
                              display: "flex",
                              alignItems: "center",
                              alignContent: "space-around",
                            }}
                          >
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
                        </div>
                      </S.ButtonSetPitch>
                    </Col>
                    <Col
                      md={{ span: 10, order: 1 }}
                      xs={{ span: 24, order: 2 }}
                    >
                      <Row
                        gutter={[16, 16]}
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          justifyContent: "center",
                          width: "98%",
                        }}
                      >
                        <Col
                          md={{ span: 13, order: 1 }}
                          xs={{ span: 14, order: 1 }}
                          style={{
                            margin: 24,
                            fontSize: 20,
                          }}
                        >
                          <S.TotalRating>
                            <div
                              style={{
                                fontSize: 15,
                                color: "red",
                                justifyContent: "space-around",
                                alignItems: "flex-start",
                              }}
                            >
                              {" "}
                              Đánh giá
                            </div>
                            <div
                              style={{
                                fontSize: 25,
                                fontFamily: "monospace",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {countAverageRating.toFixed(1)} / 5
                              <FaStar
                                style={{
                                  width: 30,
                                  height: 30,
                                  color: "#faad14",
                                }}
                                alt=""
                              />
                            </div>
                          </S.TotalRating>
                        </Col>
                        <Col
                          md={{ span: 8, order: 2 }}
                          xs={{ span: 10, order: 1 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
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
                              backgroundColor: "whitesmoke",
                              height: 100,
                              boxShadow: "rgb(0 0 0 / 60%) 0px 1px 7px",
                              border: "15px solid white",
                              borderRadius: 5,
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
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={{ span: 7, order: 1 }}
                      xs={{ span: 24, order: 3 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <S.priceFrom>
                        <div style={{ fontSize: 20, color: "red" }}>
                          Giá chỉ từ
                        </div>
                        <S.ItemIconContent>
                          <img
                            src={yuan}
                            style={{
                              width: 80,
                              height: 80,
                            }}
                            alt=""
                          />
                          <S.ItemPrice>
                            <div style={{ fontSize: 25 }}>đ &nbsp;</div>
                            {parseFloat(
                              pitchDetail.data.price
                            ).toLocaleString()}{" "}
                            VNĐ
                          </S.ItemPrice>
                        </S.ItemIconContent>
                      </S.priceFrom>
                    </Col>
                  </Row>
                </S.SearchBooking>
              </div>
              <Row gutter={[16, 16]}>
                <S.WrapperContent>
                  <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                    <S.DetailsThs>
                      <img
                        src={document}
                        style={{
                          width: 80,
                          height: 80,
                        }}
                        alt=""
                      />
                      <div> Hồ sơ của {pitchDetail.data?.name}</div>
                    </S.DetailsThs>
                  </Col>
                  <Col md={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        marginBottom: 50,
                      }}
                    >
                      <Row gutter={[16, 16]}>
                        <Col
                          md={{ span: 10, order: 1 }}
                          xs={{ span: 24, order: 1 }}
                        >
                          <S.ContentRight>
                            <div
                              style={{ width: "100%", fontSize: 20 }}
                              dangerouslySetInnerHTML={{
                                __html: pitchDetail.data.content,
                              }}
                            ></div>
                          </S.ContentRight>
                        </Col>
                        <Col
                          md={{ span: 14, order: 1 }}
                          xs={{ span: 24, order: 2 }}
                        >
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
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </S.WrapperContent>
              </Row>
              <S.WrapperReview>
                <div style={{ display: "flex" }}>
                  <img
                    src={conversation}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    alt=""
                  />
                  <h2>Bình luận</h2>
                </div>

                <div style={{ margin: 16, borderTop: "1px solid #ddd" }}>
                  {" "}
                  {renderReviewList}
                </div>
                <Col
                  span={24}
                  /*   md={{ span: 16, order: 4 }}
                  xs={{ span: 24, order: 4 }} */
                >
                  {userInfo.data.id && (
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
                    </Card>
                  )}
                </Col>
              </S.WrapperReview>
            </Spin>
          </Col>
        </Row>
      </S.Main>
    </S.Wrapper>
  );
}

export default SetPitch;
