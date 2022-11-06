import { useEffect } from "react";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";

import goal from "../../Images/goal.png";
import award from "../../Images/award.gif";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="containerNavigate">
      <div className={styles.moveNav}>
        <div className={styles.nav}>
          <ul className={styles.select}>
            <li>
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
            </li>
            <div className="logo">
              <Link to="/">
                <img src={award} style={{ width: 45, height: 45 }} />
              </Link>
            </div>
            <li>
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
                  Về chúng tôi
                </Link>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
