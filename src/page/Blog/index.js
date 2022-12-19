import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { Skeleton, Input, Space, Tag } from "antd";
import moment from "moment";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { BLOG_LIST_LIMIT } from "../../constants/paginations";
import { getBlogListAction } from "../../redux/actions";
import list from "../../Images/gif/list.gif";
import * as S from "./style";
import { ROUTES } from "../../constants/routers";
import { FaHeart, FaComments } from "react-icons/fa";
const Blog = () => {
  const [filterKeyword, setFilterKeyword] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { blogList } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBlogListAction({
        params: {
          page: 1,
          limit: BLOG_LIST_LIMIT,
        },
      })
    );
  }, [userInfo.data]);

  const handleFilterKeyword = (value) => {
    setFilterKeyword(value);
    dispatch(
      getBlogListAction({
        params: {
          keyword: value,
          page: 1,
          limit: BLOG_LIST_LIMIT,
        },
      })
    );
  };
  const handleClearKeywordFilter = () => {
    setFilterKeyword([]);
    dispatch(
      getBlogListAction({
        params: {
          filterKeyword: "",
          page: 1,
          limit: BLOG_LIST_LIMIT,
        },
      })
    );
  };

  const renderBlogList = () => {
    return blogList.data?.map((item) => {
      if (item.status === 2) {
        return (
          <S.BlogList>
            <div>
              {" "}
              <Link to={generatePath(ROUTES.USER.BLOG_DETAIL, { id: item.id })}>
                {item.title}
              </Link>
              <S.sub>
                {" "}
                <Link
                  to={generatePath(ROUTES.USER.USER_PAGE, { id: item.userId })}
                  style={{ fontSize: "10px" }}
                >
                  {item.user.fullName} <CaretRightOutlined />
                </Link>
                <h6>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</h6>
                &nbsp;
                <S.icon>
                  <div>
                    <FaHeart />
                    {item.favoriteBlogs.length}
                  </div>
                  &nbsp;
                  <div>
                    <FaComments />
                    {item.reviewBlogs.length}
                  </div>
                </S.icon>
              </S.sub>
            </div>
            <div>
              <S.ItemImage
                key={item.imageBlogs[0].id}
                src={item.imageBlogs[0].url}
                alt={item.imageBlogs[0].name}
              />
            </div>
          </S.BlogList>
        );
      }
    });
  };
  return (
    <S.Wrapper>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {" "}
        <img src={list} alt="" style={{ width: 40, height: 40 }} />
        <h1>Blog-Blog Thể Thao</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Tìm kiếm </h2>
        <Input
          placeholder="Nhập từ khóa tìm kiếm"
          onChange={(e) => handleFilterKeyword(e.target.value)}
          prefix={<SearchOutlined />}
          size="middle"
          style={{ width: "90%", borderRadius: 3 }}
        />
      </div>
      <Space>
        {filterKeyword && (
          <Tag
            style={{
              padding: "4px 8px",
              fontSize: 14,
              backgroundColor: "white",
              borderRadius: 6,
            }}
            closable
            onClose={() => handleClearKeywordFilter()}
          >
            Từ khóa: {filterKeyword}
          </Tag>
        )}
      </Space>

      <Skeleton loading={blogList.loading} active>
        {renderBlogList()}
      </Skeleton>
    </S.Wrapper>
  );
};

export default Blog;
