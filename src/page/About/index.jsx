import { Row, Col } from "antd";
import imageAbout from "../../Images/imageAbout.jpg";
import * as S from "./styles";
import handshake from "../../Images/handshake.gif";
function About() {
  return (
    <Row gutter={[16, 16]} style={{ width: "100%" }}>
      <Col xs={24}>
        <S.Wrapper>
          <Row gutter={[16, 16]}>
            <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
              <S.Title>
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={{ span: 24, order: 1 }} md={{ span: 4, order: 1 }}>
                    <img
                      src={handshake}
                      alt=""
                      style={{ width: 100, height: 100 }}
                    />{" "}
                  </Col>
                  <Col xs={{ span: 24, order: 2 }} md={{ span: 20, order: 1 }}>
                    <h3 style={{ color: "#a8071a", fontFamily: "monospace" }}>
                      Về chúng tôi
                    </h3>
                  </Col>
                </Row>
              </S.Title>
            </Col>
            <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 2 }}>
              <S.Content>
                <S.ContentImg src={imageAbout} alt="" />
                <h2 style={{ color: "#003a8c" }}>Giới thiệu về Sport</h2>
                <p
                  style={{
                    fontSize: 15,
                    padding: 10,
                    margin: " 0 60px 0 60px",
                  }}
                >
                  Mạng xã hội bóng đá dành cho anh em đầu tiên và lớn nhất tại
                  Việt Nam. Ở đây, anh em có thể dễ dàng tìm chỗ chơi, tìm đồng
                  đội hay đối thủ để chơi một cách vui vẻ, công bằng và an toàn
                  nhất.
                </p>
                <h2 style={{ color: "#003a8c" }}>Thông tin về sản phẩm</h2>
                <p>
                  Công ty TNHH Sport
                  <ul>
                    <li>Chủ sở hữu: Phan Trung Hiếu</li>
                    <li>Email:hieuphan112000@gmail.com</li>
                    <li>Di động:0906432740</li>
                  </ul>
                </p>
              </S.Content>
            </Col>
          </Row>
        </S.Wrapper>
      </Col>
    </Row>
  );
}
export default About;
