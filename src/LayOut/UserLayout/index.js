import React from "react";
import { Outlet } from "react-router-dom";

import Breadcrumb from "../BreadCrumbs/BreadCrumbs";
import Navigation from "../Navigation";
import Footer from "../Footer";
import * as S from "./styles";

const UserLayout = () => {
  return (
    <div>
      <Navigation />
      <Breadcrumb />
      <S.Wrapper>
        <Outlet />
      </S.Wrapper>
      <Footer />
    </div>
  );
};

export default UserLayout;
