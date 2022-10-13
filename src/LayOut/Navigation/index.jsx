import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { FaUser } from "react-icons/fa";

import styles from "./styles.module.css";
import { ROUTES } from "../../constants/routers";
import Header from "../Header/HeaderUser";
import goal from "../../Images/goal.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className={styles.navigation}>
      <div className={styles.fixNav}>
        <Space>
          <div className={styles.logo}>
            <img src={goal} style={{ width: 35, height: 35 }} />
          </div>
        </Space>
        <div className={styles.moveNav}>
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
        </div>
        <div className={styles.useNav}>
          <FaUser />
          <h4>{userInfo.data.fullName}</h4>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
