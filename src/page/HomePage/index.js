/* eslint-disable jsx-a11y/alt-text */
import { Button, Row, Col, Tag, Skeleton, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useEffect } from "react";
import "antd/dist/antd.min.css";
import Sliders from "react-slick";

import { getPitchListAction } from "../../redux/actions/";
import Slider from "../../LayOut/Slider";
import styles from "../HomePage/style.module.css";
import soccerarea from "../../Images/soccerarea.gif";
import mouse from "../../Images/mouse.gif";
import click from "../../Images/click.gif";
import locations from "../../Images/locations.gif";
import yuan from "../../Images/yuan.gif";
import stopwatch from "../../Images/stopwatch.gif";
import location from "../../Images/location.gif";
import podium from "../../Images/podium.gif";
import calendar from "../../Images/calendar.gif";
import smartphone from "../../Images/smartphone.gif";
import placeholder from "../../Images/placeholder.gif";

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

import { ROUTES } from "../../constants/routers";
import * as S from "./styles";

function HomePage() {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
          limit: 4,
        },
      })
    );
  }, []);

  const renderPitch = () => {
    if (pitch.loading) return <Skeleton loading={pitch.loading} active />;
    return pitch.data.map((item, index) => {
      return (
        <Col lg={12} xs={24} key={item.id}>
          <Link to={generatePath(ROUTES.USER.SET_PITCH, { id: item.id })}>
            <div className={styles.items}>
              <Space align="center" style={{ marginLeft: -8 }}>
                <img src={placeholder} style={{ width: 50, height: 50 }} />
                <h3 className={styles.itemTitle}>{item.name}</h3>
                <h5 className={styles.team}>{item.team.name}</h5>
              </Space>
              <Row gutter={[16, 16]}>
                <Col xs={10}>
                  <S.CustomSliderItem>
                    <Sliders {...settingses}>
                      {item.images.map((item) => {
                        return (
                          <img
                            key={item.id}
                            src={item.url}
                            alt={item.name}
                            className={styles.ItemImagePitch}
                          />
                        );
                      })}
                    </Sliders>
                  </S.CustomSliderItem>
                </Col>

                <Col xs={14}>
                  <div className={styles.itemPrice}>
                    <img
                      src={yuan}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      alt=""
                    />
                    {parseFloat(item.price).toLocaleString()} ??
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Space>
                      <img
                        src={locations}
                        style={{
                          width: 24,
                          height: 24,
                        }}
                        alt=""
                      />
                      <h4 style={{ fontFamily: "system-ui", margin: 0 }}>
                        ?????a ch???: {item.address}
                      </h4>
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <img
                        src={stopwatch}
                        style={{
                          width: 24,
                          height: 24,
                        }}
                        alt=""
                      />
                      <h4 style={{ fontFamily: "system-ui", margin: 0 }}>
                        Khung gi???:
                      </h4>
                    </Space>
                  </div>
                  <div>
                    {item.times?.map((itemTimes) => {
                      return (
                        <Tag
                          type="dashed"
                          style={{
                            fontSize: 12,
                            margin: 1,
                            borderRadius: 4,
                            fontFamily: "monospace",
                            color: "#003a8c",
                          }}
                        >
                          {itemTimes.name}
                        </Tag>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          </Link>
        </Col>
      );
    });
  };
  const settingses = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
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
  /*  window.addEventListener("scroll", reveal);
  const reveal = () => {
    var reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveal.length; i++) {
      var windowHeight = window.innerHeight;
      var revealTop = reveals[i].getBoundingClientRect().top;
      var revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }; */

  return (
    <Row gutter={[16, 16]}>
      <div className={styles.WrapperButtonSetPitch}>
        <div className={styles.ButtonSetPitch}>
          <Col xs={{ span: 24 }}>
            <Link to="/pitch">
              <span style={{ color: "whitesmoke", fontWeight: 900 }}>
                ?????t S??n
              </span>
              <img
                src={mouse}
                style={{
                  width: 40,
                  height: 40,
                }}
                alt=""
              />
            </Link>
          </Col>
        </div>
      </div>

      <Slider />

      <div className={styles.WrapperMaxim}>
        <div>
          <h1>T???i sao l???i c???n Sport?</h1>
          <p>N???N T???NG ?????T S??N - T??M ?????I ?????U TI??N T???I VI???T NAM</p>
        </div>

        <Row gutter={[24, 24]}>
          <Col md={8} xs={24}>
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={location}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />{" "}
                <h3>T??m ki???m v?? ?????t s??n b??ng online</h3>
              </div>
              <p>
                Th??ng tin s??n g???n v??? tr?? c???a b???n nh???t, ?????t s??n online, ti???n l???i,
                d??? d??ng
              </p>
            </div>
          </Col>
          <Col md={8} xs={24}>
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={calendar}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />

                <h3> C??ng c??? qu???n l?? s??n b??ng online</h3>
              </div>
              <p>
                Qu???n l?? l???ch ?????t ????n gi???n, ti???p nh???n ?????t s??n online d??? d??ng, l???p
                ?????y s??n tr???ng
              </p>
            </div>
          </Col>
          <Col md={8} xs={24}>
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={podium}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />
                <h3>T??? ch???c c??c gi???i ?????u v???i nhau</h3>
              </div>
              <p>
                Th?????ng xuy??n t??? ch???c c??c gi???i ?????u v??o h??ng th??ng, t???o m??i tr?????ng
                vui v??? l??nh m???nh
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.WrapperQuickView}>
        <Space>
          <img src={smartphone} alt="" />
          <h2>Xem nhanh s??n</h2>
        </Space>

        <Row gutter={[24, 24]}>{renderPitch()}</Row>
      </div>
      <div className={styles.WrapperCombo}>
        <Row gutter={[24, 24]}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className={styles.contentCombo}>
              <h2 className={styles.titleCombo}>Combo n?????c</h2>
              <div className={styles.ContentCombo}>
                ??? ????y ch??ng t??i c?? bao g???m 3 combo t??? nh??? ?????n l???n ????? ng?????i d??ng
                l???a ch???n ti???t ki???m chi ph?? c???a ?????i. M??a h?? ???? t???i v?? c??ng l?? l??c
                vi???c ch??i b??ng tr??? n??n kh?? kh??n h??n d?????i c??i n???ng ch??i chang hay
                b???u kh??ng kh?? h???m h???p c???a s??n b??ng c??? nh??n t???o. C?? th??? b???n ch???c
                ch???n s??? mau ch??ng tr??? n??n n??ng n???c v?? m???t m???i v?? thi???u n?????c. Tuy
                nhi??n, b???n v???n c??n ph??n v??n kh??ng bi???t th???c u???ng n??o th??ch h???p
                cho c?? th??? khi ???? b??ng ? H??y ????? ch??ng t??i ????a ra nh???ng l???a ch???n
                ????? b???n c?? th??? l???a ch???n n?????c u???ng m???t c??ch hi???u qu??? v?? ti???t ki???m
                nh???t:
                <ul className={styles.ulCombo}>
                  <li>
                    Combo n?????c nh???: ph?? h???p v???i 5 ng?????i tr??? xu???ng v???i m???c gi?? l??
                    25.000{" "}
                  </li>
                  <li>
                    Combo n?????c v???a: ph?? h???p t??? 5 ng?????i ?????n 7 ng?????i v???i m???c gi??
                    l?? 40.000{" "}
                  </li>
                  <li>
                    Combo n?????c nh???: ph?? h???p v???i tr??n 7 ng?????i v???i m???c gi?? l??
                    50.000{" "}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className={styles.contentCombo}>
              <h2 className={styles.titleCombo}>Tr???ng t??i</h2>
              <div className={styles.ContentCombo}>
                Tr???ng t??i l?? ng?????i ??i???u khi???n m???t tr???n ?????u trong b??ng ????. Tr???ng
                t??i c?? nh???ng nhi???m v??? th???c thi lu???t b??ng ???? ????? ??i???u khi???n tr???n
                ?????u ???? ???????c giao, l?? ng?????i ????a ra quy???t ?????nh cu???i c??ng v??? m???t
                t??nh hu???ng n??o ???? m?? kh??ng th??? thay ?????i hay ph???n ?????i ???????c. M???t
                tr???ng t??i (ph???i) ??ang gi?? th??? v??ng cho m???t c???u th??? ???? ph???m l???i
                v?? i???i quy???t c??c s??? c??? nh??: b??ng v?????t qua v???ch gi???i h???n, b??ng c??
                v?????t qua v???ch v??i hay kh??ng. S??n ch??ng t??i c?? ?????i ng?? tr???ng t??i
                v?? c??ng ch???t l?????ng c??ng v???i s??? t???n t??nh v?? nhi???t huy???t trong m???i
                tr???n ?????u h???a h???n ??em ?????n nh???ng tr???n ?????u c??ng b???ng cho c??? hai ?????i
                v?? h??i l??ng kh??n gi???.
                <ul className={styles.ulCombo}>
                  <li>Gi?? thu?? tr???ng t??i l?? 50.000 tr??n m???t tr???n ?????u</li>
                </ul>
                <span style={{ color: "red", fontSize: 20 }}>*</span>B???n c??ng c??
                th??? kh??ng th?? th??m tr???ng t??i
              </div>
            </div>
          </Col>
        </Row>
      </div>
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
      {/*  <div className={styles.wrapperContent2}>
            <div className={styles.ContainerContent2}> */}
      <Row
        gutter={[16, 16]}
        /*  style={{
              backgroundColor: "whitesmoke",
              padding: 30,
              borderRadius: 7,
              margin: 30,
            }} */
        className={styles.WrapperContact}
      >
        <Col
          md={{ span: 12, order: 1 }}
          xs={{ span: 24, order: 2 }}
          style={{
            textAlign: "center",
            backgroundColor: "#a8071a",
            borderRadius: 5,
            boxShadow: "rgb(0 0 0 / 60%) 0px 1px 8px",
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col md={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
              <p style={{ color: "whitesmoke", fontSize: 20 }}>
                T??? h??o khi l?? m???t th??nh vi??n c???a ch??ng t??i.
              </p>
            </Col>
            <Col md={{ span: 24, order: 4 }} xs={{ span: 24, order: 3 }}>
              <Link
                to={ROUTES.USER.PITCH_ABOUT}
                className={styles.defauBtn}
                danger="true"
                type="primary"
                style={{
                  fontSize: 25,
                  display: "flex",
                  width: "max-content",
                  margin: "0 auto",
                }}
              >
                {" "}
                <img
                  src={click}
                  alt=""
                  style={{
                    height: 40,
                    width: 40,
                    transform: "rotate(45deg)",
                  }}
                />
                Li??n h???
              </Link>
            </Col>

            <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
              <Row gutter={[16, 16]} align="middle" style={{ padding: 10 }}>
                <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                  <img
                    src={elite}
                    style={{ display: "inline", height: 170, width: 170 }}
                  />
                </Col>
                <Col md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                  <h2 style={{ color: "whitesmoke", fontSize: 40 }}>
                    S??? th??n thi???n v?? m??i tr?????ng ph??t tri???n{" "}
                  </h2>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 1 }}>
          <div className={styles.ContentRight2}>
            <img src={rating} />
          </div>
        </Col>
      </Row>
      {/*  */}

      {/*   </Spin> */}
    </Row>
  );
}
export default HomePage;
