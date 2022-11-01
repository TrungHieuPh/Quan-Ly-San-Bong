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
import banner from "../../Images/banner.gif";
import elite from "../../Images/elite.png";
import rating from "../../Images/rating.png";
import soccer from "../../Images/soccer.jpg";
import ImageHome3 from "../../Images/ImageHome3.jpg";
import soccer2 from "../../Images/soccer2.jpg";
import soccercup3 from "../../Images/soccercup3.jpg";
import soccer3 from "../../Images/soccer3.jpg";
import imageright from "../../Images/imageright.jpg";
import imageleft from "../../Images/imageleft.jpg";
import imageHome3 from "../../Images/ImageHome3.jpg";
import imageHome2 from "../../Images/imageHome2.jpg";
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
                  color: "#000",
                }}
              >
                {item.name}
              </Button>
            </div>
            <div style={{ padding: "2px 13px" }}>
              <div
                style={{
                  color: "#888",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 50,
                }}
              >
                <FaDollarSign /> {parseFloat(item.price).toLocaleString()}
              </div>

              <div
                style={{ color: "#888", display: "flex", alignItems: "center" }}
              >
                <FaCalendarMinus />
                <Moment format="DD/MM/YYYY" date={item.date} />
                {/*  {(item.date).} */}
              </div>
              {/*  <Button type="primary" danger block style={{ color: "black" }}>
                Đặt sân ngay
              </Button> */}
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
      <div style={{ position: "sticky", top: 100, zIndex: 1 }}>
        <div className={styles.ButtonSetPitch}>
          <Link to="/pitch">
            <span>Đặt Sân</span>
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
        {/*  */}

        {/*  <div className="containerWrapper3">
          <ul className={styles.ContentContainer3}>
            <Link to={ROUTES.USER.PITCH_LIST} className={styles.ContentLeft3}>
              <div className={styles.ContentItem}>
                <div className={styles.ContentThumb}>
                  <img className={styles.ImageLeft} src={piture43} />
                </div>
                <div className={styles.ContentCaption}>
                  <div className={styles.ContentCapDesc}>
                    <p>
                      <a>
                        <span>BÓNG ĐÁ</span>
                      </a>
                    </p>
                    <p>
                      <a>
                        <span>Thể thao sức khỏe</span>
                      </a>
                    </p>
                  </div>
                  <div className={styles.ContentCapTitle}>SPORTS</div>
                  <div className={styles.ContentCapContent}>
                    <p>&nbsp;</p>
                    <p>
                      <a>
                        <span style={{ color: "#ffffff" }}>
                          Bóng đá là môn thể thao phổ biến và được yêu thích
                          nhất trên thế giới từ xưa tới nay, nó được chơi từ
                          đẳng cấp chuyên nghiệp cho tới nghiệp dư, từ thành thị
                          cho tới xóm làng, từ người lớn cho tới trẻ nhỏ. Bóng
                          đá là bình đẳng, không phân biệt màu da hay giới tính.
                          Mỗi khi có trận bóng đá lớn, hàng vạn người đến sân để
                          xem và cổ vũ cùng hàng triệu người khác theo dõi qua
                          tivi nếu không thể đến sân vận động. Ở các quán cà phê
                          hay những điểm chiếu công cộng, bóng đá gắn kết mọi
                          người theo cách rất riêng và đặc biệt mà không thứ gì
                          khác có thể làm được. Có thể nói, bóng đá còn nhiều
                          hơn là một môn thể thao!
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={ROUTES.USER.PITCH_LIST} className={styles.ContentRight3}>
              <div className={styles.ContentItemRight}>
                <div className={styles.ContentThumbRight}>
                  <img src={soccer2} />
                </div>
                <div className={styles.ContentCaptionRight}>
                  <div className={styles.ContentCapDescRight}>
                    <p>
                      <a>
                        <span>Sự đoàn kết</span>
                      </a>
                    </p>
                    <p>
                      <a>
                        <span>Nơi thể hiện đam vê và tính đồng đội</span>
                      </a>
                    </p>
                  </div>
                  <div className={styles.ContentCapTitleRight}>SPORT</div>
                  <div className={styles.ContentCapContentRight}>
                    <p>&nbsp;</p>
                    <p>
                      <a>
                        <span style={{ color: "#ffffff" }}>
                          Bóng đá là tôn giáo, bóng đá cũng là cuộc sống. Với
                          nhiều người, đó là niềm đam mê mãnh liệt, họ như sinh
                          ra chỉ vì bóng đá và chết đi cùng với bóng đá. Trong
                          trận đấu, họ cùng cười, khóc, hồi hộp, căng thẳng
                          trong từng giây, từng phút với đội bóng yêu thích của
                          mình. Họ cũng cảm nhận được sự vinh quang khi chiến
                          thắng hay những giọt nước mắt của nỗi buồn khi thất
                          bại. Hôm nay, tôi sẽ gửi tới các bạn 50 dòng status
                          bóng đá và những câu nói hay nhất về bóng đá vô cùng ý
                          nghĩa để mọi người cùng nhau suy ngẫm. Hy vọng rằng
                          các bạn cũng sẽ thích những câu nói hay về bóng đá!
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </ul>
        </div> */}
        {/*  */}
        <div style={{ border: "1px solid #ddd" }}>
          <>
            <div>
              <Sliders {...settings1}>
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
            <div>
              <h2>Auto Play</h2>
              <Sliders {...settings}>
                <div>
                  <img src={soccer2} />
                </div>
                <div>
                  <img src={soccercup3} />
                </div>
                <div>
                  <img src={soccer3} />
                </div>
                <div>
                  <img src={imageright} />
                </div>
                <div>
                  <img src={imageleft} />
                </div>
                <div>
                  <img src={imageHome3} />
                </div>
                <div>
                  <img src={imageHome2} />
                </div>
                <div>
                  <img src={soccer} />
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
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {renderPitch()}
              </div>
              <Button
                type="link"
                style={{
                  margin: 16,
                  width: "100%",
                  color: "red",
                  fontSize: 30,
                }}
                onClick={() => navigate(ROUTES.USER.PITCH_LIST)}
              >
                ... Xem Thêm
              </Button>

              {/* <div>
                <img src={imageHome1} />
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
              <h2>Sự thân thiện và môi trường phát triển </h2>
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
    </div>
  );
}
export default HomePage;
