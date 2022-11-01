import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";

import goal from "../../Images/goal.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.fixNav}>
        <Space>
          <div className={styles.logo}>
            <Link to="/">
              <img src={goal} style={{ width: 35, height: 35 }} />
            </Link>
          </div>
        </Space>
        {/* <div className={styles.moveNav}>
          <div className={styles.nav}>
            <ul className={styles.select}>
              <li>
                <Link className={styles.isActive} to={ROUTES.USER.HOME}>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link className={styles.isActive} to={ROUTES.USER.PITCH_LIST}>
                  Đặt Sân
                </Link>
              </li>
              <li>
                <Link
                  className={styles.isActive}
                  to={ROUTES.USER.PITCH_HISTORY}
                >
                  Lịch Sử
                </Link>
              </li>
              <li>
                <Link className={styles.isActive} to={ROUTES.USER.PITCH_ABOUT}>
                  about
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
        {userInfo.data.fullName ? (
          <Dropdown
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
            <Space>
              <UserOutlined style={{ color: "black" }} />
              <div style={{ color: "black" }}>{userInfo.data.fullName}</div>
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
        )}
      </div>
    </div>
  );
};
export default Navigation;
