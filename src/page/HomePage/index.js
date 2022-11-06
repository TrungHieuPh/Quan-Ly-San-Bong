/* eslint-disable jsx-a11y/alt-text */
import {
  Space,
  Button,
  Carousel,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Form,
  Divider,
  Layout,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import Sliders from "react-slick";

import { getPitchListAction } from "../../redux/actions/";
import Slider from "../../LayOut/Slider";
import styles from "../HomePage/style.module.css";
import * as S from "./style";

import stadium from "../../Images/stadiumU.gif";
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
        <>
          <Link
            to={generatePath(ROUTES.USER.SET_PITCH, { id: item.id })}
            className={styles.items}
          >
            <div className={styles.itemTitle}>
              {/*   <span className={styles.new}>New</span> */}
              <img src={stadium} style={{ width: 35, height: 35 }} />
              <Button
                type="link"
                onClick={() => navigate(`/pitch/${item.id}/setPitch`)}
                primary
                style={{
                  fontSize: 55,
                  fontWeight: 600,
                  padding: 2,
                  color: "#820014",
                }}
              >
                {item.name}
              </Button>
            </div>
            <div style={{ padding: "2px 13px" }}>
              <div
                style={{
                  color: "#820014",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 50,
                }}
              >
                <FaDollarSign /> {parseFloat(item.price).toLocaleString()}
              </div>
            </div>
          </Link>
        </>
      );
    });
  };
  const getTime = (values) => {
    console.log(values);
    console.log(moment().toDate(values).valueOf(values));
    console.log(<Moment format="YYYY MM DD">{values}</Moment>);
  };

  const DemoBox = (props) => (
    <p className={`height-${props.value}`}>{props.children}</p>
  );
  var settings1 = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div>
      {/*  <Spin spinning={pitch.loading}> */}
      <div style={{ position: "sticky", top: 100, zIndex: 1 }}>
        <div className={styles.ButtonSetPitch}>
          <Link to="/pitch">
            <span style={{ color: "#820014" }}>Đặt Sân</span>
          </Link>
        </div>
      </div>

      <div className={styles.main}></div>
      <div className="wrapper">
        <div className={styles.wrapperNavigate}>{/*  <Navigate /> */}</div>
        <div id="banner"></div>
        <Slider />

        <div className="container-wrapper1" style={{ width: "100%" }}>
          <div className={styles.ContentContainer1}>
            <div className={styles.contentWrapperButton}>
              <Link>Điểm Đến</Link>
            </div>
            {/*  <div className={styles.contentWrapperButton}>
              <Link>Thương Hiệu</Link>
            </div> */}
            <div className={styles.contentWrapperButton}>
              <Link>Ưu Đãi</Link>
            </div>
            <div className={styles.contentWrapperButton}>
              <Link>Giải Đấu</Link>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#820014",
            }}
          >
            {renderPitch()}
          </div>
          <Button
            type="link"
            style={{
              margin: 24,
              width: "100%",
              color: "#820014",
              fontSize: 20,
            }}
            onClick={() => navigate(ROUTES.USER.PITCH_LIST)}
          >
            Xem Thêm
          </Button>
        </div>
        {/*  */}

        <div>
          <>
            <div>
              <Sliders {...settings}>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 0px",
                        }}
                        src={piture6}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 0px",
                        }}
                        src={piture7}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 385,
                          height: "auto",
                          margin: "15px 0px 0px 15px  ",
                        }}
                        src={piture5}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 0px",
                        }}
                        src={soccer2}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 0px",
                        }}
                        src={soccer3}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 360,
                          height: "auto",
                          margin: "15px 0px 0px 24px  ",
                        }}
                        src={imageHome}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 15px",
                        }}
                        src={imageright}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px 15px",
                        }}
                        src={imageleft}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 348,
                          height: "auto",
                          margin: "15px 0px 0px 30px  ",
                        }}
                        src={piture2}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px -15px",
                        }}
                        src={piture3}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 410,
                          height: "auto",
                          margin: "15px 0px 15px -15px",
                        }}
                        src={piture4}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Row>
                    <Col span={4}>
                      {" "}
                      <img
                        style={{
                          width: 384,
                          height: "auto",
                          margin: "15px 0px 0px 10px  ",
                        }}
                        src={piture1}
                      />
                    </Col>
                  </Row>
                </div>
              </Sliders>
            </div>
          </>
        </div>

        {/*  <Layout style={contentStyle}>
          <Layout.Footer>Sider</Layout.Footer>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
        <Layout style={contentStyle}>
          <Layout.Footer>Sider</Layout.Footer>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout> */}
        {/* Render san */}
        <div className={styles.contentStyle}>
          <div className="main" style={{ width: "100%" }}>
            <div className={styles.contentCenter}>
              {/*  <div className={styles.titlePitch}>
                <FaCalendarDay
                  style={{ color: "#183153", height: 50, width: 40 }}
                />
                <div className={styles.text}>Danh sách Sân</div>
              </div> */}
            </div>
          </div>
          {/* <div
            className="right"
            style={{ width: "35%", border: "10px solid black" }}
          >
           
            <img src={banner} style={{ height: 350, width: 350 }} />
          </div> */}
        </div>
        {/* Abou */}
        <div className={styles.wrapperContent2}>
          <div className={styles.ContainerContent2}>
            <div className={styles.Contentleft2}>
              <img src={elite} />
              <h2 style={{ color: "#820014;" }}>
                Sự thân thiện và môi trường phát triển{" "}
              </h2>
              <p>Tự hào khi là một thành viên của chúng tôi.</p>
              <Link
                to={ROUTES.USER.PITCH_ABOUT}
                className={styles.defauBtn}
                danger
                type="primary"
              >
                About
              </Link>
            </div>
            <div className={styles.ContentRight2}>
              <img src={rating} />
            </div>
          </div>
        </div>
        {/*  <div className={styles.ItemWrapperCarousel}>
          <Carousel autoplay effect={"scrollx"}>
            <div>
              <img ClassName={styles.ItemCarousel} src={soccer} />
            </div>
            <div>
              <h3 ClassName={styles.ItemCarousel}>2</h3>
            </div>
            <div>
              <h3 ClassName={styles.ItemCarousel}>3</h3>
            </div>
            <div>
              <h3 ClassName={styles.ItemCarousel}>4</h3>
            </div>
          </Carousel>
        </div> */}
      </div>
      {/*   </Spin> */}
    </div>
  );
}
export default HomePage;
