import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, generatePath, Link } from "react-router-dom";
import { Avatar, Tabs, Row, Col, Divider, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BLOG_LIST_LIMIT } from "../../constants/paginations";

import { getUserPage, getBlogListAction } from "../../redux/actions";
import { ROUTES } from "../../constants/routers";
import * as S from "./style";
const UserPage = () => {
  const { id } = useParams();

  const { userPage } = useSelector((state) => state.user);
  const { blogList } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPage({ id: id }));
  }, [id]);
  /* useEffect(() => {
    dispatch(getUserPage({ id: id }));
  }, [id]);


   {
      blogList.data.map((item) => {
        if (item.userId === id) return dispatch(
          getBlogListAction({
            id: id,
            params: {
              page: 1,
              limit: BLOG_LIST_LIMIT,
            },
          })
        );
      } */

  const renderBlogList = () => {
    return userPage.data.blogs?.map((item) => {
      return (
        <Row>
          <Link to={generatePath(ROUTES.USER.BLOG_DETAIL, { id: item.id })}>
            -{item.title}
          </Link>
        </Row>
      );
    });
  };
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <Avatar size={64} icon={<UserOutlined />} />{" "}
        <h2>{userPage.data.fullName}</h2>
        <h5>{userPage.data.role === "admin" && "Quản trị viên"}</h5>
      </S.TopWrapper>
      <div>
        <Tabs>
          <Tabs.TabPane tab="Hồ sơ" key="1">
            <h2>Hồ sơ của {userPage.data.fullName}</h2>
            <Row>
              <Col>
                <h4>Địa chỉ: &nbsp;</h4>
              </Col>
              <Col>
                {userPage.data.info?.address} - {userPage.data.info?.wardName} -
                {userPage.data.info?.districtName} -
                {userPage.data.info?.cityName}
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Số điện thoại: &nbsp;</h4>
              </Col>
              <Col>{userPage.data.info?.phone}</Col>
            </Row>
            <Row>
              <Col>
                <h4>Ngày sinh: &nbsp;</h4>
              </Col>
              <Col>{userPage.data.date}</Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Blog" key="2">
            <h2>Danh sách Blog của {userPage.data.fullName}</h2>
            {renderBlogList()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="xếp hạng" key="3"></Tabs.TabPane>
        </Tabs>
      </div>
    </S.Wrapper>
  );
};

export default UserPage;
