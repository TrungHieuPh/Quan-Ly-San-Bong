import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

import * as S from "./styles";

function Header() {
  const { pathname } = useLocation();
  return (
    <S.header>
      <S.topBar>
        <S.HeaderLogo>SOCCER</S.HeaderLogo>
        <S.HeaderContainer>
          <S.HeaderContent>
            <div className=" text-center">
              <S.HeaderItem to="/trangchu" active={pathname === "/trangchu"}>
                Trang chủ
              </S.HeaderItem>
              <S.HeaderItem to="/datsan" active={pathname === "/datsan"}>
                Đặt Sân
              </S.HeaderItem>
            </div>
            <div className=" text-center">
              <S.HeaderItem to="/lichsu" active={pathname === "/lichsu"}>
                Lịch sử
              </S.HeaderItem>
              <S.HeaderItem to="/about" active={pathname === "/about"}>
                about
              </S.HeaderItem>
            </div>
          </S.HeaderContent>
        </S.HeaderContainer>
      </S.topBar>
    </S.header>
  );
}
export default Header;
