import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import video from "../../videobg.mp4";
import styles from "../Slider/style.module.css";
const Slider = () => {
  return (
    <Row gutter={24} align="center" justify="center">
      <Col xs={24}>
        <Row
          gutter={[12, 12]}
          align="middle"
          /*     style={{ flexDirection: "row-reverse", alignItems: "center" }} */
        >
          <Col md={24} xs={24}>
            <div className={styles.Wrapper}>
              <video src={video} autoPlay loop muted></video>
            </div>
          </Col>
          <Col md={24} xs={24}>
            <Row gutter={[12, 12]}>
              <Col md={24} xs={24}>
                <h1 className={styles.Itemslogan}>
                  Ghi bàn trong bất kỳ trận đấu nào luôn là khoảnh khắc hạnh
                  phúc nhất.
                </h1>
              </Col>
              <Col xs={24} md={24}>
                <p className={styles.sloganEnglish}>
                  Scoring in any match is always the happiest moment of life.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Slider;
