import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { Space } from "antd";
import { ROUTES } from "../../constants/routers";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Navigation from "../Navigation";
import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  console.log("abc", userInfo.data);

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && userInfo.loading) {
    return (
      <S.LoadingWrapper>
        <LoadingOutlined style={{ fontSize: 35 }} />
      </S.LoadingWrapper>
    );
  } else if (userInfo.data.role !== "admin")
    return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <Header
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
        isShowDrawer={isShowDrawer}
        setIsShowDrawer={setIsShowDrawer}
      />

      <S.MainContainer>
        <Sidebar isShowSidebar={isShowSidebar} />

        <S.MainContent isShowSidebar={isShowSidebar}>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </>
  );
}

export default AdminLayout;
