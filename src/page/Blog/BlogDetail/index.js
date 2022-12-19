import React from "react";
import { useEffect } from "react";
import { useParams, Link, generatePath } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailAction } from "../../../redux/actions";
import { ROUTES } from "../../../constants/routers";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Input,
  Space,
  Form,
  Button,
  Rate,
  notification,
  Popconfirm,
  Skeleton,
} from "antd";
import conversation from "../../../Images/conversation.gif";
import pencil from "../../../Images/pencil.gif";
import {
  postReviewBlogAction,
  deleteReviewBlogAction,
  getReviewListBlogAction,
  unFavoriteBlogAction,
  favoriteBlogAction,
} from "../../../redux/actions";
import { FaUser } from "react-icons/fa";

import { PITCH_LIST_LIMIT } from "../../../constants/paginations";
import * as S from "./style";
import moment from "moment";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const [changeReviewForm] = Form.useForm();

  const { id } = useParams();
  console.log(id);
  const { userInfo } = useSelector((state) => state.user);
  const { blogDetail } = useSelector((state) => state.blog);
  const { reviewBlogList } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getBlogDetailAction({ id: id }));
    dispatch(getReviewListBlogAction({ blogId: id }));
  }, [id]);
  /*  useEffect(() => {
    dispatch(getReviewListBlogAction({ blogId: id }));
  }, [blogDetail.data.reviewBlogList]); */
  const isReview = userInfo.data.id
    ? blogDetail.data.reviewBlogs?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  const handlePostReviewBlog = (values) => {
    if (userInfo.data.id) {
      if (isReview) {
        const ReviewData = blogDetail.data.reviewBlogs?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (ReviewData) {
          notification.warn({ message: "Bạn đã bình luận bài viết rồi" });
        }
      } else {
        dispatch(
          postReviewBlogAction({
            ...values,
            userId: userInfo.data.id,
            blogId: blogDetail.data.id,
            callback: {
              clearForm: () => changeReviewForm.resetFields(),
            },
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const renderImageBlog = () => {
    return blogDetail.data.imageBlogs?.map((item) => {
      return (
        <img
          src={item.url}
          alt={item.name}
          style={{
            margin: "10px auto",
            width: "80%",
            height: "500px",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      );
    });
  };
  const renderReviewList = () => {
    if (!reviewBlogList.data.length) return null;
    return reviewBlogList.data?.map((item) => {
      if (parseInt(item.blogId) === parseInt(id))
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
                      ? dispatch(
                          deleteReviewBlogAction({ id: item.id, blogId: id })
                        )
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
  const isLike = userInfo.data.id
    ? blogDetail.data.favoriteBlogs?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;
  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = blogDetail.data.favoriteBlogs?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoriteBlogAction({
              id: favoriteData.id,
              blogId: blogDetail.data.id,
              /*  pitchName: blogDetail.data.name, */
            })
          );
        }
      } else {
        dispatch(
          favoriteBlogAction({
            userId: userInfo.data.id,
            blogId: blogDetail.data.id,
            /*  pitchName: blogDetail.data.name, */
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };
  return (
    <S.Wrapper>
      <Skeleton loading={blogDetail.loading} active>
        <S.TitleBlog>{blogDetail.data.title}</S.TitleBlog>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <S.Author>
            <Avatar size="small" icon={<UserOutlined />} />
            <div style={{ paddingLeft: 7 }}>
              <Link
                to={generatePath(ROUTES.USER.USER_PAGE, {
                  id: blogDetail.data?.userId || "",
                })}
                style={{ fontSize: "16px" }}
              >
                {blogDetail.data.user?.fullName}
              </Link>

              <h4>
                {moment(blogDetail.data.createdAt).format("HH:mm  DD/MM/YYYY")}
              </h4>
            </div>
          </S.Author>
          <S.flowerBlog>
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
                /*  backgroundColor: "whitesmoke", */
                height: "auto",
                borderRadius: 8,
                border: "none",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  /*  color: "#003a8c", */
                }}
              >
                Yêu thích
              </div>
              <Space>
                {isLike ? <HeartFilled /> : <HeartOutlined />}
                {blogDetail.data?.favoriteBlogs?.length || 0} lượt
                {/*  <img
                src={mouse}
                style={{
                  width: 60,
                  height: 60,
                  position: "relative",
                  transform: "rotate(-30deg)",
                }}
                alt=""
              /> */}
              </Space>
            </Button>
          </S.flowerBlog>
        </div>

        <div
          style={{
            width: "100%",
            fontSize: 20,
            color: "#003a8c",
          }}
          dangerouslySetInnerHTML={{
            __html: blogDetail.data.content,
          }}
        ></div>
        {renderImageBlog()}
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
                form={changeReviewForm}
                name="changeReviewForm"
                layout="vertical"
                onFinish={(values) => handlePostReviewBlog(values)}
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
                <Button
                  type="primary"
                  style={{ Background: "#003a8c" }}
                  htmlType="submit"
                  block
                >
                  Đăng bình luận
                </Button>
              </S.CustomForm>
            </S.WrapperWriteComment>
          )}
        </S.SearchBooking>
      </Skeleton>
    </S.Wrapper>
  );
};

export default BlogDetail;
