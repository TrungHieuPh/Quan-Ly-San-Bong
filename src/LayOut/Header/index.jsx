import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

import styles from "./styles.module.css";

function Header() {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.user);

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
            <div className={styles.userNav}>
              <FaUser />
              <h4>{userInfo.data.fullName}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
