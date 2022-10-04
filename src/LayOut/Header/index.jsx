import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./styles";

function Header() {
  const { pathname } = useLocation();
  return (
    <S.WrapperHeader>
      <S.HeaderLogo>LOGO</S.HeaderLogo>
      <section id="path">
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.HeaderItem to="/trangchu" active={pathname === "/trangchu"}>
              Trang chủ
            </S.HeaderItem>
            <S.HeaderItem to="/datsan" active={pathname === "/datsan"}>
              Đặt Sân
            </S.HeaderItem>
            <S.HeaderItem to="/lichsu" active={pathname === "/lichsu"}>
              Lịch sử
            </S.HeaderItem>
            <S.HeaderItem to="/about" active={pathname === "/about"}>
              about
            </S.HeaderItem>
          </S.HeaderContent>
        </S.HeaderContainer>
      </section>
    </S.WrapperHeader>
  );
}
export default Header;
