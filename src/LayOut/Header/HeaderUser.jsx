import { FaUser } from "react-icons/fa";
import Navigation from "../Navigation";
import Slider from "../Slider";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import video from "../../videobg.mp4";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";
import { FaBars, FaTimes } from "react-icons/fa";

import goal from "../../Images/goal.png";
import award from "../../Images/award.gif";
import * as S from "./styles";
import styles from "./css.module.css";
import { Header } from "antd/lib/layout/layout";

function HeaderUser() {
  const { userInfo } = useSelector((state) => state.user);

  const navRef = useRef();
  const [isShowNavBar, setIsShowNavBar] = useState(false);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

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
    <S.ContainerWrapper>
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

        <nav
          className={
            isShowNavBar ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <Row>
            <Col span={24}>
              <nav className={styles.moveNav}>
                <div className={styles.nav}>
                  <nav
                    className={
                      isShowNavBar ? styles.selectActive : styles.select
                    }
                  >
                    <li>
                      <Link className={styles.isActive} to={ROUTES.USER.HOME}>
                        Trang chủ
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={styles.isActive}
                        to={ROUTES.USER.PITCH_LIST}
                      >
                        Đặt Sân
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={styles.isActive}
                        to={ROUTES.USER.PITCH_LIST}
                        /*   to={( teamList.data.find((teamItem) => teamItem.id === 1) &&
                          dispatch(
                            getPitchListAction({
                              params: {
                                teamId: 1,
                                page: 1,
                                limit: PITCH_LIST_LIMIT,
                              },
                            })
                          )))} */
                      >
                        Sân 5
                      </Link>
                    </li>

                    <div className={styles.logoNav}>
                      <Link to="/">
                        <img src={award} style={{ width: 45, height: 45 }} />
                      </Link>
                    </div>

                    <li>
                      <Link
                        className={styles.isActive}
                        to={ROUTES.USER.PITCH_HISTORY}
                      >
                        Sân 7
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={styles.isActive}
                        to={ROUTES.USER.PITCH_ABOUT}
                      >
                        Về chúng tôi
                      </Link>
                    </li>
                  </nav>
                </div>
              </nav>
            </Col>
          </Row>
        </nav>
        <Space>
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
                <div style={{ color: "black" }}>{userInfo.data.name}</div>
              </Space>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
          )}
          <Button
            className={styles.navBtn}
            onClick={() => {
              setIsShowNavBar(!isShowNavBar);
            }}
          >
            {isShowNavBar ? <FaTimes /> : <FaBars />}
          </Button>
        </Space>
      </S.TopWrapper>
    </S.ContainerWrapper>
  );
}
export default HeaderUser;
