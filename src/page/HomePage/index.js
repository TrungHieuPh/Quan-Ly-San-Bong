/* eslint-disable jsx-a11y/alt-text */
import { Button, Row, Col, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import Sliders from "react-slick";

import { getPitchListAction } from "../../redux/actions/";
import Slider from "../../LayOut/Slider";
import styles from "../HomePage/style.module.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import soccerarea from "../../Images/soccerarea.gif";
import click from "../../Images/click.gif";
import locations from "../../Images/locations.gif";
import yuan from "../../Images/yuan.gif";
import stopwatch from "../../Images/stopwatch.gif";

import elite from "../../Images/elite.png";
import rating from "../../Images/rating.png";
import soccer2 from "../../Images/soccer2.jpg";
import soccer3 from "../../Images/soccer3.jpg";
import imageright from "../../Images/imageright.jpg";
import imageleft from "../../Images/imageleft.jpg";
import imageHome from "../../Images/imageHome.jpg";
import piture1 from "../../Images/picture1.jpg";
import piture2 from "../../Images/piture2.jpg";
import piture3 from "../../Images/piture3.jpg";
import piture4 from "../../Images/piture4.jpg";
import piture5 from "../../Images/piture5.jpg";
import piture6 from "../../Images/piture6.jpg";
import piture7 from "../../Images/piture7.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* import fooball from "../../Images/fooballPlayer.gif"; */
import {
  FaCalendarMinus,
  FaDollarSign,
  FaGripLinesVertical,
  FaCalendarDay,
  FaTag,
  FaEye,
} from "react-icons/fa";
import { ROUTES } from "../../constants/routers";

function HomePage() {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateFormat = "YYYY:MM:DD";
  const today = new Date();
  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
          limit: 3,
        },
      })
    );
  }, []);

  const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      return (
        <Col
          md={{ span: 7, flex: 1 }}
          /*   sm={{ span: 18, flex: 1 }} */
          xs={24}
          key={item.id}
          className={styles.items}
        >
          <Link to={generatePath(ROUTES.USER.SET_PITCH, { id: item.id })}>
            <Row gutter={[16, 16]}>
              <Col
                md={{ span: 24, offset: 0 }}
                xs={{ span: 20, offset: 0 }}
                className={styles.itemTitle}
              >
                {/*   <span className={styles.new}>New</span> */}
                <img src={soccerarea} style={{ width: 35, height: 35 }} />
                <Button
                  type="link"
                  onClick={() => navigate(`/pitch/${item.id}/setPitch`)}
                  primary
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    padding: 2,
                    color: "#820014",
                  }}
                >
                  {item.name}
                </Button>
              </Col>
              <Row style={{ /* display: "flex", */ width: "100%" }}>
                <Col
                  md={{ span: 12, offset: 0 }}
                  xs={{ span: 8, order: 1, offset: 4 }}
                >
                  <img
                    key={item.images[0]?.id}
                    src={item.images[0]?.url}
                    alt={item.images[0]?.name}
                    style={{
                      objectFit: "cover",
                      height: "150px",
                      margin: 16,
                      borderRadius: 6,
                      width: "150px",
                    }}
                  />
                </Col>

                <Col md={12} xs={{ span: 12, order: 1 }} style={{ padding: 0 }}>
                  <div className={styles.itemPrice}>
                    <img
                      src={yuan}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      alt=""
                    />
                    {parseFloat(item.price).toLocaleString()} đ
                  </div>
                  <div style={{ display: "flex" }}>
                    <img
                      src={locations}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      alt=""
                    />
                    <h4>Địa chỉ: {item.address}</h4>
                  </div>
                  <div>
                    <h5 style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <img
                        src={stopwatch}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                        alt=""
                      />
                      khung giờ của sân:
                    </h5>
                    {item.times?.map((itemTimes) => {
                      return (
                        <Tag
                          type="dashed"
                          danger
                          style={{ fontSize: 12, margin: 1, borderRadius: 4 }}
                        >
                          {itemTimes.name}
                        </Tag>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Row>
          </Link>
        </Col>
      );
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Row gutter={[16, 16]}>
          <div className={styles.WrapperButtonSetPitch}>
            <div className={styles.ButtonSetPitch}>
              <Col xs={{ span: 24 }}>
                <Link to="/pitch">
                  <span style={{ color: "#fa541c" }}>Đặt Sân</span>
                  <img
                    src={click}
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    alt=""
                  />
                </Link>
              </Col>
            </div>
          </div>

          <Col md={24} sm={24} xs={24}>
            <Slider />
          </Col>
          <Col xs={24} md={24}>
            <Row gutter={[16, 16]}>
              <Col
                md={{ span: 8, order: 2 }}
                sm={{ span: 24, order: 2 }}
                xs={{ span: 24, order: 1 }}
                /* offset="24" */
              >
                <div className={styles.contentWrapperButton}>
                  <Link>Điểm Đến</Link>
                </div>
              </Col>
              <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 2 }}>
                <div className={styles.contentWrapperButton}>
                  <Link>Ưu Đãi</Link>
                </div>
              </Col>
              <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 3 }}>
                <div className={styles.contentWrapperButton}>
                  <Link>Giải Đấu</Link>
                </div>
              </Col>
              {/*     </div> */}
            </Row>
          </Col>
          <Col xs={24}>
            <h2 className={styles.titleView}>
              {" "}
              <FaEye style={{ color: "#1890ff" }} />
              Xem nhanh
            </h2>

            <Row
              gutter={[16, 24]}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#820014",
                marginTop: 50,
              }}
            >
              {renderPitch()}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col
                md={{ span: 12, order: 1 }}
                xs={{ span: 24, order: 1 }}
                style={{
                  color: "white",
                  width: "100%",
                  boxShadow: "rgb(0 0 0 / 60%) 0px 27px 47px",
                  borderRadius: 8,
                  padding: "20px 30px 10px 30px",
                }}
              >
                <h2 className={styles.titleCombo}>Combo nước</h2>
                <p className={styles.ContentCombo}>
                  Ở đây chúng tôi có bao gồm 3 combo từ nhỏ đến lớn để người
                  dùng lựa chọn tiết kiệm chi phí của đội. Mùa hè đã tới và cũng
                  là lúc việc chơi bóng trở nên khó khăn hơn dưới cái nắng chói
                  chang hay bầu không khí hầm hập của sân bóng cỏ nhân tạo. Cơ
                  thể bạn chắc chắn sẽ mau chóng trở nên nóng nực và mệt mỏi vì
                  thiếu nước. Tuy nhiên, bạn vẫn còn phân vân không biết thức
                  uống nào thích hợp cho cơ thể khi đá bóng ? Hãy để chúng tôi
                  đưa ra những lựa chọn để bạn có thể lựa chọn nước uống một
                  cách hiệu quả và tiết kiệm nhất:
                  <ul className={styles.ulCombo}>
                    <li>
                      Combo nước nhỏ: phù hợp với 5 người trở xuống với mức giá
                      là 25.000{" "}
                    </li>
                    <li>
                      Combo nước vừa: phù hợp từ 5 người đến 7 người với mức giá
                      là 40.000{" "}
                    </li>
                    <li>
                      Combo nước nhỏ: phù hợp với trên 7 người với mức giá là
                      50.000{" "}
                    </li>
                  </ul>
                </p>
              </Col>
              <Col
                md={{ span: 12, order: 1 }}
                xs={{ span: 24, order: 2 }}
                style={{
                  color: "white",
                  width: "100%",
                  boxShadow: "rgb(0 0 0 / 60%) 0px 27px 47px",
                  borderRadius: 8,
                  padding: "20px 30px 10px 30px",
                }}
              >
                <h2 className={styles.titleCombo}>Trọng tài</h2>
                <p className={styles.ContentCombo}>
                  Trọng tài là người điều khiển một trận đấu trong bóng đá.
                  Trọng tài có những nhiệm vụ thực thi luật bóng đá để điều
                  khiển trận đấu đã được giao, là người đưa ra quyết định cuối
                  cùng về một tình huống nào đó mà không thể thay đổi hay phản
                  đối được. Một trọng tài (phải) đang giơ thẻ vàng cho một cầu
                  thủ đã phạm lỗi và iải quyết các sự cố như: bóng vượt qua vạch
                  giới hạn, bóng có vượt qua vạch vôi hay không. Sân chúng tôi
                  có đội ngũ trọng tài vô cùng chất lượng cùng với sự tận tình
                  và nhiệt huyết trong mỗi trận đầu hứa hẹn đem đến những trận
                  đầu công bằng cho cả hai đội và hài lòng khán giả.
                  <ul className={styles.ulCombo}>
                    <li>Giá thuê trọng tài là 50.000 trên một trận đấu</li>
                  </ul>
                  <span style={{ color: "red", fontSize: 20 }}>*</span>Bạn cũng
                  có thể không thê thêm trọng tài
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Sliders {...settings}>
              <div>
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 0px",
                    objectFit: "cover",
                  }}
                  src={piture6}
                />
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 0px",
                    objectFit: "cover",
                  }}
                  src={piture7}
                />
              </div>
              <div>
                <img
                  style={{
                    width: 374,
                    height: "auto",
                    margin: "15px 0px 0px 20px  ",
                    objectFit: "cover",
                  }}
                  src={piture5}
                />
              </div>
              <div>
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 0px",
                    objectFit: "cover",
                  }}
                  src={soccer2}
                />
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 0px",
                    objectFit: "cover",
                  }}
                  src={soccer3}
                />
              </div>
              <div>
                <img
                  style={{
                    width: 350,
                    height: "auto",
                    margin: "15px 0px 0px 35px  ",
                    objectFit: "cover",
                  }}
                  src={imageHome}
                />
              </div>
              <div>
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 15px",
                    objectFit: "cover",
                  }}
                  src={imageright}
                />
                <img
                  style={{
                    width: 410,
                    height: "auto",
                    margin: "15px 0px 15px 15px",
                    objectFit: "cover",
                  }}
                  src={piture4}
                />
              </div>
              <div>
                <img
                  style={{
                    width: 339,
                    height: "auto",
                    margin: "15px 0px 0px 43px  ",
                    objectFit: "cover",
                  }}
                  src={piture2}
                />
              </div>
            </Sliders>
          </Col>
          {/* Render san */}
          <div className={styles.contentStyle}>
            <div className="main" style={{ width: "100%" }}>
              <div className={styles.contentCenter}></div>
            </div>
          </div>
          {/* Abou */}
          <Row gutter={[16, 16]}>
            <div className={styles.wrapperContent2}>
              <div className={styles.ContainerContent2}>
                <Row gutter={[24, 24]}>
                  <Col md={{ span: 24, order: 2 }} xs={{ span: 24, order: 3 }}>
                    {" "}
                    <p style={{ color: "whitesmoke" }}>
                      Tự hào khi là một thành viên của chúng tôi.
                    </p>
                  </Col>
                  <Col md={{ span: 12, order: 4 }} xs={{ span: 20, order: 3 }}>
                    <Link
                      to={ROUTES.USER.PITCH_ABOUT}
                      className={styles.defauBtn}
                      danger
                      type="primary"
                    >
                      About
                    </Link>
                  </Col>

                  <div className={styles.Contentleft2} gutter={[16, 16]}>
                    <Col
                      md={{ span: 12, order: 1 }}
                      xs={{ span: 20, order: 2 }}
                    >
                      <img src={elite} />
                    </Col>
                    <Col
                      md={{ span: 12, order: 1 }}
                      xs={{ span: 20, order: 2 }}
                    >
                      <h2 style={{ color: "whitesmoke" }}>
                        Sự thân thiện và môi trường phát triển{" "}
                      </h2>
                    </Col>
                  </div>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col md={{ span: 24, order: 4 }} xs={{ span: 16, order: 1 }}>
                    <div className={styles.ContentRight2}>
                      <img src={rating} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
          <Col md={24} xs={24}></Col>

          {/*   </Spin> */}
        </Row>
      </Col>
    </Row>
  );
}
export default HomePage;
