import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaPhone,
  FaFacebook,
} from "react-icons/fa";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";
import { getTeamListAction, getPitchListAction } from "../../redux/actions";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";

import mouse from "../../Images/mouse.gif";

import vietnam from "../../Images/vietnam.png";

import * as S from "./styles";
import styles from "./css.module.css";

function HeaderUser() {
  const { userInfo } = useSelector((state) => state.user);
  const { teamList } = useSelector((state) => state.team);

  const [isShowNavBar, setIsShowNavBar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.ContainerWrapper>
      <S.TopWrapper>
        {/*  <Spin spinning={userInfo.loading}> */}
        {/* <div style={{ width: "max-content" }}>Sự kiện</div> */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space
              style={{ position: "absolute", zIndex: 2, top: 15, left: 15 }}
            >
              <div className={styles.selectLeft}>
                <Row gutter={[16, 16]}>
                  <Col md={{ span: 6, order: 1 }}>
                    <img
                      src={vietnam}
                      alt=""
                      style={{ height: 30, width: 30 }}
                    />
                  </Col>
                  <Col md={{ span: 16, order: 1 }}>
                    <Space>
                      <Col
                        md={{ span: 18, order: 1 }}
                        xs={{ span: 24, order: 2 }}
                        className={styles.sdt}
                      >
                        <h5>
                          <FaPhone className={styles.IconPhone} />
                        </h5>
                        &nbsp;
                        <h4>0906432740</h4>
                      </Col>

                      <Col md={{ span: 16, order: 1 }} className={styles.fb}>
                        <a href="https://www.facebook.com/profile.php?id=100010165278384">
                          <FaFacebook className={styles.IconFb} />
                        </a>
                      </Col>
                    </Space>
                  </Col>
                </Row>
              </div>
            </Space>
          </Col>
          <div className="fixNav" style={{ width: "100%", height: 0 }}>
            <div style={{ height: 0 }}>
              <S.LogoWrapper>
                <Link to="/">
                  <h1 className={styles.logo}>sport</h1>
                </Link>
              </S.LogoWrapper>
            </div>
          </div>

          <Space
            style={{ position: "absolute", zIndex: 2, top: 15, right: 15 }}
          >
            <nav className={isShowNavBar ? styles.selectActive : styles.select}>
              <li style={{ fontSize: 19, color: "#003a8c" }}>
                <Link
                  style={{ display: "flex" }}
                  className={styles.isActive}
                  to={ROUTES.USER.PITCH_LIST}
                >
                  <FaCalendarAlt
                    style={{ height: 20, width: 20, color: "#ad2102" }}
                  />
                  Đặt Sân
                  <img
                    src={mouse}
                    alt=""
                    style={{
                      position: "relative",
                      right: 4,
                      top: 2,
                      height: 35,
                      width: 35,
                      transform: "rotate(315deg)",
                    }}
                  />
                </Link>
              </li>
              &nbsp;&nbsp; &nbsp;&nbsp;
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
                      <Menu.Item
                        key="1"
                        onClick={() => navigate(ROUTES.USER.PROFILE)}
                      >
                        Trang của tôi
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
                    <UserOutlined style={{ color: "#ad2102" }} />
                    <div style={{ color: "#003a8c" }}>{userInfo.data.name}</div>
                  </Space>
                </Dropdown>
              ) : (
                <Button onClick={() => navigate(ROUTES.LOGIN)}>
                  Đăng nhập
                </Button>
              )}
            </nav>
            <Button
              className={styles.navBtn}
              onClick={() => {
                setIsShowNavBar(!isShowNavBar);
              }}
            >
              {isShowNavBar ? <FaTimes /> : <FaBars />}
            </Button>
          </Space>
        </Row>
      </S.TopWrapper>
    </S.ContainerWrapper>
  );
}
export default HeaderUser;
