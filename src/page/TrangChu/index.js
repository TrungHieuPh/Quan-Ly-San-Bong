import { Space, Card, Button, Descriptions, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import styles from "../TrangChu/style.module.css";
import video from "../../videobg.mp4";
import gif from "../../Images/gif2.gif";
import checklist from "../../Images/checklist.gif";
import { getPitchListAction } from "../../redux/actions/";
import ball from "../../Images/ball.gif";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function TrangChu() {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPitchListAction());
  }, []);

  /* ================================ */

  /* ================================= */
  const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      return (
        <div className={styles.items}>
          <div className={styles.itemTitle}>
            <img src={ball} style={{ width: 35, height: 35 }} />
            <Button
              type="link"
              onClick={() => navigate(`/datsan/${item.id}/setPitch`)}
              primary
              style={{
                fontSize: 25,
                fontWeight: 400,
                padding: 0,
                color: "black",
              }}
            >
              {item.name}
            </Button>
          </div>
          <Space style={{ paddingLeft: 40 }}>
            <h4 style={{ color: "#888" }}>Giá: {item.price} * </h4>
            <h5 style={{ color: "#8888" }}>Ngày tạo: {item.date} * </h5>
            <h5 style={{ color: "#8888" }}>Địa chỉ: {item.adress} </h5>
          </Space>
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
      <div className={styles.contentStyle}>
        <div className="main">
          <div className={styles.contentCenter}>
            <div className={styles.titlePitch}>
              <img src={checklist} className={styles.imgList} />
              <h2>Danh sách Sân</h2>
            </div>
            <Input
              size="middle"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              autoFocus={true}
            />
          </div>
          {renderPitch()}
          {/*   <div className="right">
            <h2>right</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default TrangChu;
