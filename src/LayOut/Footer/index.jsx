import styles from "./styles.module.css";
import { Input, Button } from "antd";
function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 500 }}>
            Đăng ký nhận bản tin của chúng tôi
          </div>
          <Input
            placeholder="Basic usage"
            style={{ width: "40%", borderRadius: 6 }}
          />
          <Button type="primary" style={{ width: "10%", borderRadius: 6 }}>
            Gửi
          </Button>
        </div>
        <div className={styles.copyRight}>
          © 2020 Bản quyền: MDBootstrap.com
        </div>
      </div>
    </div>
  );
}
export default Footer;
