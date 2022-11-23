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
              margin: 16,
              borderBottom: ".2px solid #e0dddd8f",
              color: "#003a8c",
            }}
          >
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

              <div style={{ color: "#003a8c" }}>
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
  };

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

                <S.itemPanner>
                  <div>
                    <Button
                      type="link"
                      style={{
                        float: "left",
                        color: "#f5222d",
                        fontSize: "large",
                        fontWeight: 800,
                      }}
                      onClick={() => navigate(-1 || ROUTES.USER.HOME)}
                    >
                      <FaArrowLeft />
                      Quay lại
                    </Button>
                    <img
                      src={click}
                      alt=""
                      style={{
                        height: 50,
                        width: 50,
                        position: "relative",
                        bottom: 65,
                        transform: "rotate(-180deg)",
                      }}
                    />
                  </div>
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
                </S.itemPanner>
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
                  <Row gutter={[16, 16]}>
                    <Col md={{ span: 7, order: 1 }} xs={{ span: 24, order: 1 }}>
                      {userInfo.data.id && (
                        <S.ButtonSetPitch
                          style={{
                            fontSize: 24,
                            backgroundColor: "whitesmoke",
                            boxShadow: "rgb(0 0 0 / 60%) 0px 3px 5px",
                            border: "11px solid white",
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
                          md={{ span: 14, order: 1 }}
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
                                color: "#003a8c",
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
                                color: "#a8071a",
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
                              border: "12px solid white",
                              borderRadius: 5,
                            }}
                          >
                            {pitchDetail.data?.favorites?.length || 0}
                            <img
                              src={mouse}
                              style={{
                                width: 60,
                                height: 60,
                                position: "relative",
                                top: 10,
                                transform: "rotate(-30deg)",
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
                        <div style={{ fontSize: 20, color: "#003a8c" }}>
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
                  {renderReviewList()}
                </div>
                <Col
                  span={24}
                  /*   md={{ span: 16, order: 4 }}
                  xs={{ span: 24, order: 4 }} */
                >
                  {userInfo.data.id && (
                    <S.WrapperWriteComment
                      size="small"
                      bordered={false}
                      actions={<EditOutlined />}
                      title="Viết bình luận tại đây !!!"
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
                        <img
                          src={pencil}
                          style={{
                            width: 40,
                            height: 40,
                          }}
                          alt=""
                        />
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
                          <Input.TextArea
                            autoSize={{ maxRows: 6, minRows: 4 }}
                          />
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
