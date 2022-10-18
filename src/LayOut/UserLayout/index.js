import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routers";
import Breadcrumb from "../BreadCrumbs/BreadCrumbs";
import Navigation from "../Navigation";
import Footer from "../Footer";

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
      <Navigation />
      <Breadcrumb />

      <S.Wrapper>
        <Outlet />
        <S.Line></S.Line>
      </S.Wrapper>

      <Footer />
    </S.Container>
  );
};

export default UserLayout;
