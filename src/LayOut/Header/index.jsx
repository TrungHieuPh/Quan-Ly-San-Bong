import { useState } from "react";

import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Button, Space } from "antd";

import * as S from "./styles";

function Header(props) {
  const { isShowSidebar, setIsShowSidebar, isShowDrawer, setIsShowDrawer } =
    props;
  const { userInfo } = useSelector((state) => state.user);

  return (
    <S.HeaderContainer>
      <Space>
        <S.Logo>
          <div>Logo</div>
        </S.Logo>

        <Button onClick={() => setIsShowSidebar(!isShowSidebar)}>
          Mở/Đóng Sidebar
        </Button>
      </Space>
      <S.UseNav>
        <FaUser />
        <h4>{userInfo.data.fullName}</h4>
      </S.UseNav>
    </S.HeaderContainer>
  );
}
export default Header;
