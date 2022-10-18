import { Space, Button, Descriptions, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Moment from "react-moment";

import { getPitchListAction } from "../../redux/actions/";
import Footer from "../../LayOut/Footer";
import Slider from "../../LayOut/Slider";
import Navigate from "../../LayOut/Navigation";
import styles from "../HomePage/style.module.css";
import fooball from "../../Images/footbalPlayer.gif";
import soccerPlayer from "../../Images/soccerPlayer.gif";
import stadium from "../../Images/stadium.gif";
import imageHome1 from "../../Images/imageHome2.jpg";
import imageHome from "../../Images/imageHome.jpg";
import banner from "../../Images/banner.gif";
import elite from "../../Images/elite.png";
import rating from "../../Images/rating.png";

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
            {/*   <a href="/pitch" className={styles.gifs}>
              <img src={fooball}></img>
              <h3>Đặt Sân Ngay</h3>
            </a> */}
          </div>
        </div>
        <Slider />
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
            ac
          >
            {/*        <img src={imageHome} /> */}
            <img src={banner} style={{ height: 350, width: 350 }} />
          </div>
        </div>
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
      </div>
    </div>
  );
}
export default HomePage;
