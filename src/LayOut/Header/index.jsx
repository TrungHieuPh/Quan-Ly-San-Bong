import { useLocation, useNavigate, Link } from "react-router-dom";
import { Col, Row } from "antd";

import styles from "./styles.module.css";

function Header() {
  const { pathname } = useLocation();
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div>Logo</div>
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.fixNav}>
          <div className={styles.moveNav}>
            <div className={styles.nav}>
              <ul className={styles.select}>
                <li>
                  <Link
                    className={styles.isActive}
                    to="/trangchu"
                    active={pathname === "/trangchu"}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.isActive}
                    to="/datsan"
                    active={pathname === "/datsan"}
                  >
                    Đặt Sân
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.isActive}
                    to="/lichsu"
                    active={pathname === "/lichsu"}
                  >
                    Lịch Sử
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.isActive}
                    to="/about"
                    active={pathname === "/about"}
                  >
                    about
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
