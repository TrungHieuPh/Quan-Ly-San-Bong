/* eslint-disable jsx-a11y/alt-text */
import { Space, Button, Carousel, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Moment from "react-moment";

import { getPitchListAction } from "../../redux/actions/";
import Slider from "../../LayOut/Slider";
import styles from "../HomePage/style.module.css";

import stadium from "../../Images/stadium.gif";
import banner from "../../Images/banner.gif";
import elite from "../../Images/elite.png";
import rating from "../../Images/rating.png";
import soccercup1 from "../../Images/soccercup1.jpg";
import soccer2 from "../../Images/soccer2.jpg";
import ImageHome3 from "../../Images/ImageHome3.jpg";
import soccer from "../../Images/soccer.jpg";
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

  const dateFormat = "YYYY-MM-DD";
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
        <div className={styles.items}>
          <div className={styles.itemTitle}>
            <span className={styles.new}>New</span>
            <img src={stadium} style={{ width: 35, height: 35 }} />
            <Button
              type="link"
              onClick={() => navigate(`/pitch/${item.id}/setPitch`)}
              primary
              style={{
                fontSize: 23,
                fontWeight: 600,
                padding: 2,
                color: "#000",
              }}
            >
              {item.name}
            </Button>
          </div>
          <Space style={{ padding: "2px 13px" }}>
            <div
              style={{ color: "#888", display: "flex", alignItems: "center" }}
            >
              <FaDollarSign /> {parseFloat(item.price).toLocaleString()}
              <FaGripLinesVertical />
            </div>

            <div
              style={{ color: "#888", display: "flex", alignItems: "center" }}
            >
              <FaCalendarMinus />
              <Moment format="DD/MM/YYYY" date={item.date} />
              {/*  {(item.date).} */}
              <FaGripLinesVertical />
            </div>

            <div
              style={{ color: "#888", display: "flex", alignItems: "center" }}
            >
              <FaTag />
              {item.title}
            </div>
          </Space>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="wrapper">
        <div className={styles.wrapperNavigate}>{/*  <Navigate /> */}</div>
        <div id="banner">
          <div className={styles.main}>
            <Link> Đặt Phòng</Link>
          </div>
        </div>
        <Slider />
        {/* Button */}
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
        <div className="containerWrapper3">
          <ul className={styles.ContentContainer3}>
            <li className={styles.ContentLeft3}>
              <div className={styles.ContentItem}>
                <div className={styles.ContentThumb}>
                  <img className={styles.ImageLeft} src={ImageHome3} />
                </div>
                <div className={styles.ContentCaption}></div>
              </div>
            </li>
            <li className={styles.ContentRight3}>
              <img src={soccer2} />
            </li>
          </ul>
          {/*  <div className={styles.ContentContainer2}>
            <div className={styles.ContentLeft3}>
              <img src={soccercup1} />
            </div>
            <div className={styles.ContentRight3}>
              <img src={soccer} />
            </div>
          </div> */}
        </div>
        {/* Render san */}
        <div className={styles.contentStyle}>
          <div className="main" style={{ width: "60%" }}>
            <div className={styles.contentCenter}>
              <div className={styles.titlePitch}>
                <FaCalendarDay
                  style={{ color: "#183153", height: 50, width: 40 }}
                />
                <div className={styles.text}>Danh sách Sân</div>
              </div>
            </div>
            <div>
              <div>{renderPitch()}</div>
              <Button
                type="link"
                style={{ margin: 16, width: "100%", color: "black" }}
                onClick={() => navigate(ROUTES.USER.PITCH_LIST)}
              >
                ... Xem Thêm
              </Button>

              {/* <div>
                <img src={imageHome1} />
              </div> */}
            </div>
          </div>
          <div
            className="right"
            style={{ width: "35%", border: "10px solid black" }}
          >
            {/*        <img src={imageHome} /> */}
            <img src={banner} style={{ height: 350, width: 350 }} />
          </div>
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
        <div className={styles.ItemWrapperCarousel}>
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
        </div>
      </div>
    </div>
  );
}
export default HomePage;
