import { Outlet, Navigate } from "react-router-dom";

import * as S from "./styles";
import Footer from "../Footer";

import { ROUTES } from "../../constants/routers";

function LoginLayout() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
      <Footer />
    </>
  );
}

export default LoginLayout;
