import { Space, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../TrangChu/style.module.css";
import video from "../../videobg.mp4";
import gif from "../../Images/gif2.gif";
import checklist from "../../Images/checklist.gif";
import { getPitchListAction } from "../../redux/actions/";

function TrangChu() {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPitchListAction());
  }, []);
  const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      return (
        <div ClassName="itemPitch" style={{ borderBottom: " 1px solid #ddd" }}>
          {/*  <a to={navigate(`/datsan/${item.id}/setPitch`)} replace></a> */}

          <h3
            style={{ textDecoration: "underline" }}
            onClick={() => navigate(`/datsan/${item.id}/setPitch`)}
          >
            {item.name}
          </h3>
          <ol>
            <li>
              <i class="fa-solid fa-calendar-day"></i>
              <span>
                Ngày đăng: <span class="timesetdefault">{item.date}</span>
              </span>
            </li>
            <li>
              <span>Địa điểm: {item.adress}</span>
            </li>
          </ol>
        </div>
      );
    });
  };
  return (
    <div className="wrapper">
      <div id="banner">
        <div className={styles.main}>
          <a href="/datsan" className={styles.gifs}>
            <img src={gif} title="Đặt"></img>
            <h3>Đặt Sân Ngay</h3>
          </a>
          <video src={video} autoPlay loop muted></video>
        </div>
      </div>

      <div className={styles.content}>
        <div
          className="main"
          style={{ display: "flex", justifyContent: "space-around " }}
        >
          {/*   <div className="left">
            <h2>left</h2>
          </div> */}
          <div className={styles.contentCenter}>
            {/*  <section id="contentTitle"> */}
            <Space
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid #ddd",
              }}
            >
              <img src={checklist} className={styles.imgList} />
              <h2>Danh sách Sân</h2>
            </Space>
            <Card size="small" style={{ marginTop: 16 }}>
              {renderPitch()}
            </Card>
          </div>

          <div className="right">
            <h2>right</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrangChu;
