import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Button, Space } from "antd";
import Navigation from "../Navigation";
import goal from "../../Images/goal.png";

import * as S from "./styles";

function Header() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <S.HeaderContainer>
      <Space>
        <S.Logo>
          <img src={goal} style={{ width: 35, height: 35 }} />
        </S.Logo>
      </Space>

      <S.UseNav>
        <FaUser />
        <h4>{userInfo.data.fullName}</h4>
      </S.UseNav>
    </S.HeaderContainer>
  );
}
export default Header;
