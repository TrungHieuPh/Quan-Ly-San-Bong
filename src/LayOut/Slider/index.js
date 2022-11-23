import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.min.css";

import video from "../../videobg.mp4";
import styles from "../Slider/style.module.css";
const Slider = () => {
  return (
    <>
      <div className={styles.Wrapper}>
        <video src={video} autoPlay loop muted></video>
      </div>
      <h1 className={styles.Itemslogan}>
        Ghi bàn trong bất kỳ trận đấu nào luôn là khoảnh khắc hạnh phúc nhất.
      </h1>
      <p className={styles.sloganEnglish}>
        Scoring in any match is always the happiest moment of life.
      </p>
    </>
  );
};

export default Slider;
