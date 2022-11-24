/* eslint-disable jsx-a11y/alt-text */
import { Button, Row, Col, Tag, Spin, Space } from "antd";
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
    if (pitch.loading)
      return <Spin size="small" style={{ textAlign: "center" }} />;
    return pitch.data.map((item, index) => {
      return (
        <Col md={12} xs={24} key={item.id}>
          <Link to={generatePath(ROUTES.USER.SET_PITCH, { id: item.id })}>
            <div className={styles.items}>
              <Space align="center" style={{ marginLeft: -8 }}>
                <img src={placeholder} style={{ width: 50, height: 50 }} />
                <h3 className={styles.itemTitle}>{item.name}</h3>
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
                    {parseFloat(item.price).toLocaleString()} đ
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
                        Địa chỉ: {item.address}
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
                        Khung giờ:
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
                Đặt Sân
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
          <h1>Tại sao lại cần Sport?</h1>
          <p>NỀN TẢNG ĐẶT SÂN - TÌM ĐỐI ĐẦU TIÊN TẠI VIỆT NAM</p>
        </div>

        <Row gutter={[24, 24]}>
          <Col
            md={{ span: 8, order: 2 }}
            sm={{ span: 24, order: 2 }}
            xs={{ span: 24, order: 1 }}
          >
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={location}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />{" "}
                <h3>Tìm kiếm và đặt sân bóng online</h3>
              </div>
              <p>
                Thông tin sân gần vị trí của bạn nhất, đặt sân online, tiện lợi,
                dễ dàng
              </p>
            </div>
          </Col>
          <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 2 }}>
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={calendar}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />

                <h3> Công cụ quản lý sân bóng online</h3>
              </div>
              <p>
                Quản lý lịch đặt đơn giản, tiếp nhận đặt sân online dễ dàng, lấp
                đầy sân trống
              </p>
            </div>
          </Col>
          <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 3 }}>
            <div className={styles.contentWrapperButton}>
              <div>
                <img
                  src={podium}
                  alt=""
                  style={{ width: 72, height: 72, margin: "0 auto" }}
                />
                <h3>Tổ chức các giải đấu với nhau</h3>
              </div>
              <p>
                Thường xuyên tổ chức các giải đấu vào hàng tháng, tạo môi trường
                vui vẻ lành mạnh
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.WrapperQuickView}>
        <Space>
          <img src={smartphone} alt="" />
          <h2>Xem nhanh sân</h2>
        </Space>

        <Row gutter={[24, 24]}>{renderPitch()}</Row>
      </div>
      <div className={styles.WrapperCombo}>
        <Row gutter={[24, 24]}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className={styles.contentCombo}>
              <h2 className={styles.titleCombo}>Combo nước</h2>
              <div className={styles.ContentCombo}>
                Ở đây chúng tôi có bao gồm 3 combo từ nhỏ đến lớn để người dùng
                lựa chọn tiết kiệm chi phí của đội. Mùa hè đã tới và cũng là lúc
                việc chơi bóng trở nên khó khăn hơn dưới cái nắng chói chang hay
                bầu không khí hầm hập của sân bóng cỏ nhân tạo. Cơ thể bạn chắc
                chắn sẽ mau chóng trở nên nóng nực và mệt mỏi vì thiếu nước. Tuy
                nhiên, bạn vẫn còn phân vân không biết thức uống nào thích hợp
                cho cơ thể khi đá bóng ? Hãy để chúng tôi đưa ra những lựa chọn
                để bạn có thể lựa chọn nước uống một cách hiệu quả và tiết kiệm
                nhất:
                <ul className={styles.ulCombo}>
                  <li>
                    Combo nước nhỏ: phù hợp với 5 người trở xuống với mức giá là
                    25.000{" "}
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
              </div>
            </div>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className={styles.contentCombo}>
              <h2 className={styles.titleCombo}>Trọng tài</h2>
              <div className={styles.ContentCombo}>
                Trọng tài là người điều khiển một trận đấu trong bóng đá. Trọng
                tài có những nhiệm vụ thực thi luật bóng đá để điều khiển trận
                đấu đã được giao, là người đưa ra quyết định cuối cùng về một
                tình huống nào đó mà không thể thay đổi hay phản đối được. Một
                trọng tài (phải) đang giơ thẻ vàng cho một cầu thủ đã phạm lỗi
                và iải quyết các sự cố như: bóng vượt qua vạch giới hạn, bóng có
                vượt qua vạch vôi hay không. Sân chúng tôi có đội ngũ trọng tài
                vô cùng chất lượng cùng với sự tận tình và nhiệt huyết trong mỗi
                trận đầu hứa hẹn đem đến những trận đầu công bằng cho cả hai đội
                và hài lòng khán giả.
                <ul className={styles.ulCombo}>
                  <li>Giá thuê trọng tài là 50.000 trên một trận đấu</li>
                </ul>
                <span style={{ color: "red", fontSize: 20 }}>*</span>Bạn cũng có
                thể không thê thêm trọng tài
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
                Tự hào khi là một thành viên của chúng tôi.
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
                Liên hệ
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
                    Sự thân thiện và môi trường phát triển{" "}
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
