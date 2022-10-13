import React from "react";
import { Steps } from "antd";
const DetailSetPitch = () => {
  const { Step } = Steps;
  return (
    <div>
      <h1>Tiep Tuc Dat San</h1>
      <Steps current={1}>
        <Step title="Finished" description="This is a description." />
        <Step
          title="In Progress"
          subTitle="Left 00:00:08"
          description="This is a description."
        />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    </div>
  );
};
export default DetailSetPitch;
