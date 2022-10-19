import React from "react";
import video from "../../videobg.mp4";
import styles from "../Slider/style.module.css";
const Slider = () => {
  return (
    <div style={{ height: 630 }}>
      <video src={video} autoPlay loop muted></video>
      <h1 className={styles.Itemslogan}>
        Ghi bàn trong bất kỳ trận đấu nào luôn là khoảnh khắc hạnh phúc nhất.
      </h1>
      <p className={styles.sloganEnglish}>
        Scoring in any match is always the happiest moment of life.
      </p>
    </div>
  );
};

export default Slider;
