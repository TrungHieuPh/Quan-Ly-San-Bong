import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routers";
import Breadcrumb from "../BreadCrumbs/BreadCrumbs";
import Navigation from "../Navigation";
import HeaderUser from "../Header/HeaderUser";
import Footer from "../Footer";
import Slider from "../Slider";
import Profile from "../../page/profile";

import * as S from "./styles";

const UserLayout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  /*  if (accessToken && userInfo.loading) {
    return (
      <S.LoadingWrapper>
        <LoadingOutlined style={{ fontSize: 32 }} />
      </S.LoadingWrapper>
    );
  } else if (userInfo.data.role !== "user") {
    return <Navigate to={ROUTES.LOGIN} />;
  } */
  return (
    <S.Container>
      <HeaderUser />

      <S.Wrapper>
        <Outlet />
        {/* <Profile />
        </Outlet> */}

        <S.Line></S.Line>
      </S.Wrapper>

      <Footer />
    </S.Container>
  );
};

export default UserLayout;
