import { useState } from "react";
import { Outlet } from "react-router-dom";

import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Header from "../Header";
import Footer from "../Footer";
import * as S from "./styles";
function AdminLayout() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>

      <Footer />
    </>
  );
}

export default AdminLayout;
