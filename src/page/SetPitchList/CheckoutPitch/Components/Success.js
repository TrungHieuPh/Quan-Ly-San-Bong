import React from "react";
import { useEffect } from "react";

import { Result, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOderListAction } from "../../../../redux/actions";
import { ROUTES } from "../../../../constants/routers";
const Success = () => {
  const navigate = useNavigate();
  /*   const { id } = useParams();
  const dispatch = useDispatch();
  const { bookingList } = useSelector((state) => state.booking);
  useEffect(() => {
    dispatch(getOderListAction(id));
  }, [id]); */
  return (
    <div>
      {" "}
      <Result
        status="success"
        title="Chúc mừng bạn đã đặt sân thành công!"
        subTitle="Mời bạn nhấn tiếp tục hoặc quay lại trang chủ."
        extra={[
          <Button
            type="primary"
            key="console"
            danger
            onClick={() => navigate(ROUTES.USER.HOME)}
          >
            Trang chủ
          </Button>,
          <Button key="buy" onClick={() => navigate(ROUTES.USER.PITCH_LIST)}>
            Tiếp tục
          </Button>,
        ]}
        style={{ backgroundColor: "whitesmoke" }}
      />
    </div>
  );
};

export default Success;
