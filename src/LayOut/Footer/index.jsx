import styles from "./styles.module.css";
import { Input, Button, Row, Col } from "antd";
function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Row gutter={[16, 16]}>
          <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
            <Row gutter={[16, 16]}>
              <Col md={{ span: 6, order: 1 }} xs={{ span: 24, order: 1 }}>
                <div style={{ fontSize: "20px", fontWeight: 500 }}>
                  Đăng ký nhận bản tin của chúng tôi
                </div>
              </Col>
              <Col md={{ span: 14, order: 2 }} xs={{ span: 24, order: 2 }}>
                <Input
                  placeholder="Email của bạn!"
                  style={{ width: "100%", borderRadius: 6 }}
                />
              </Col>
              <Col md={{ span: 4, order: 2 }} xs={{ span: 24, order: 3 }}>
                <Button danger block type="primary" style={{ borderRadius: 6 }}>
                  Gửi
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
            <div className={styles.copyRight}>@ From React By Hieu ...</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Footer;
