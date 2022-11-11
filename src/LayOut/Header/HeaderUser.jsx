import { FaUser } from "react-icons/fa";
import Navigation from "../Navigation";
import Slider from "../Slider";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import video from "../../videobg.mp4";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";

import goal from "../../Images/goal.png";
import award from "../../Images/award.gif";
import * as S from "./styles";
import styles from "./css.module.css";

function HeaderUser() {
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.TopWrapper>
      {/*  <Spin spinning={userInfo.loading}> */}
      {/* <div style={{ width: "max-content" }}>Sự kiện</div> */}

      <div className="fixNav">
        <div>
          <div className="logo">
            <Link to="/">
              <h6 className={styles.logo}>sport</h6>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <Navigation />
      </div>

      {userInfo.data.fullName ? (
        <Dropdown
          /*  style={{ minWidth: 110 }} */
          overlay={
            <Menu>
              {userInfo.data.role === "admin" && (
                <Menu.Item
                  key="0"
                  onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
                >
                  Trang Admin
                </Menu.Item>
              )}
              <Menu.Item key="1" onClick={() => navigate(ROUTES.USER.PROFILE)}>
                Trang của tôi
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => navigate(ROUTES.USER.PITCH_HISTORY)}
              >
                Lịch sử
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleLogout()}>
                Đăng xuất
              </Menu.Item>
            </Menu>
          }
        >
          <Space
            style={{
              fontSize: 18,
            }}
          >
            <UserOutlined style={{ color: "black" }} />
            <div style={{ color: "black" }}>{userInfo.data.fullName}</div>
          </Space>
        </Dropdown>
      ) : (
        <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
      )}
    </S.TopWrapper>
  );
}
export default HeaderUser;
