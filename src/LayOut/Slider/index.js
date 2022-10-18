import React from "react";
import video from "../../videobg.mp4";
const Slider = () => {
  return (
    <div>
      <video src={video} autoPlay loop muted></video>
      <div style={{ borderBottom: "3px solid #ddd", margin: "30px 0px" }}></div>
    </div>
  );
};

export default Slider;
