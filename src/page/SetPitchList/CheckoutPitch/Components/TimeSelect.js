import { useEffect, useMemo, useState } from "react";
import { Button, Select, Calendar, Avatar, Radio, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useNavigate,
  useParams,
  Link,
  generatePath,
} from "react-router-dom";
import moment from "moment";
import * as S from "../styles";
import "antd-notifications-messages/lib/styles/style.css";

import {
  getPitchDetailAction,
  getOderListAction,
  getArbitrationAction,
  bookingPitchAction,
  getComboAction,
} from "../../../../redux/actions";
import { ROUTES } from "../../../../constants/routers";
const TimeSelect = ({ setStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitchDetail } = useSelector((state) => state.product);
  const { pitch } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { arbitrationList } = useSelector((state) => state.arbitration);
  const { comboList } = useSelector((state) => state.combo);

  const { id } = useParams();

  const [dateSelected, setDateSelected] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptionArbitration, setSelectedOptionArbitration] =
    useState("");
  const [selectedOptionCombo, setSelectedOptionCombo] = useState("");

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
    dispatch(getOderListAction({ id: id }));
    dispatch(getArbitrationAction());
    dispatch(getComboAction());
  }, [id]);

  function handleSelectedDate(value) {
    setDateSelected(moment(value).format("DD/MM/YYYY"));
  }

  const handleBookingPitch = (id) => {
    if (!userInfo) {
      alert("Bạn cần đăng nhập!");
    } else {
      dispatch(
        bookingPitchAction({
          pitchsId: id,
          timeSelect: dateSelected,
          timeId: selectedOption,
          userId: userInfo.data.id,
        })
      );
    }
    alert("đặt sân thành công");
    navigate(ROUTES.USER.PITCH_LIST);
  };

  const selectedOptionData = arbitrationList.data?.find(
    (item) => item.id === selectedOptionArbitration
  );
  const bonusPrice = selectedOptionData ? selectedOptionData?.bonusPrice : 0;
  const productPrice =
    parseInt(pitchDetail.data.price || 0) + parseInt(bonusPrice);

  const selectedOptionDataCombo = comboList.data?.find(
    (item) => item.id === selectedOptionCombo
  );
  const bonusPriceCombo = selectedOptionDataCombo
    ? selectedOptionDataCombo?.bonusPrice
    : 0;
  const productPriceCombo =
    parseInt(productPrice || 0) + parseInt(bonusPriceCombo);

  const renderArbitrationList = useMemo(() => {
    return arbitrationList.data?.map((item) => {
      return (
        <Radio.Button
          key={item.id}
          name="option"
          value={item.id}
          style={{ margin: 6 }}
        >
          {item.name}
        </Radio.Button>
      );
    });
  }, [arbitrationList.data]);
  const renderComboList = useMemo(() => {
    return comboList.data?.map((item) => {
      return (
        <Radio.Button
          key={item.id}
          name="option"
          value={item.id}
          style={{ margin: 6 }}
        >
          {item.name}
        </Radio.Button>
      );
    });
  }, [comboList.data]);

  const renderPitchOrder = () => {
    let isDisabled = false;
    if (pitch.dateSelected || dateSelected)
      Array.from(bookingList.data).forEach((bookingItem, bookingIndex) => {
        if (
          moment(pitch.dateSelected || dateSelected, "DD/MM/YYYY").valueOf() ===
            moment(bookingItem.timeSelect, "DD/MM/YYYY").valueOf() &&
          selectedOption === bookingItem.timeId
        ) {
          isDisabled = true;
        }
      });
    return (
      <>
        {userInfo.data.id && (
          <div>
            {isDisabled && (
              <Button
                type="primary"
                disabled
                danger
                style={{ fontSize: 20, height: 50 }}
              >
                Tiếp tục
              </Button>
            )}
            {!isDisabled && (
              <Button
                onClick={() => setStep(1)}
                type="primary"
                danger
                style={{ fontSize: 30, height: 60 }}
              >
                Tiếp tục
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const renderTimeShootOptions = useMemo(() => {
    return pitchDetail.data.times?.map((item, index) => {
      return (
        /*  <Col span={24} > */
        <Radio.Button
          key={item.id}
          name="option"
          value={item.id}
          style={{ margin: 6 }}
        >
          {item.name}
        </Radio.Button>
        /*  </Col> */
      );
    });
  }, [pitchDetail.data]);

  const day = new Date();
  day.setDate(day.getDate());
  const disabledDate = (current) => {
    return current && current.valueOf() < day;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          margin: "55px 0px 0px  0px",
          backgroundColor: "white",
          boxShadow: "rgb(0 0 0 / 50%) 1px 0px 2px 2px",
        }}
      >
        <div
          style={{
            width: "60%",
            backgroundColor: "#425B76",
            textAlign: "center",
          }}
        >
          {/*   <Avatar size={100} icon={<UserOutlined />} /> */}
          <h2 style={{ margin: 16 }}>Bạn ơi, chọn ngày ở đây !</h2>
          <Calendar
            disabledDate={disabledDate}
            fullscreen={false}
            onChange={(values) => handleSelectedDate(values)}
            defaultValue={dateSelected}
            style={{
              margin: "30px  60px 60px",
              backgroundColor: "#425B76",
            }}
          />
        </div>

        <div
          style={{
            width: "40%",
            border: "1px solid white",
            backgroundColor: "white",
          }}
        >
          <h2>Thời gian nào là thuận tiện nhất?</h2>

          <Radio.Group
            onChange={(e) => setSelectedOption(e.target.value)}
            defaultValue={selectedOption}
            style={{
              /*    position: "relative",
              top: 75, */
              padding: 25,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {renderTimeShootOptions}
          </Radio.Group>
          <div style={{ margin: 16 }}>
            <h3>Bạn có muốn thêm trọng tài?</h3>
            <Radio.Group
              onChange={(e) => setSelectedOptionArbitration(e.target.value)}
              defaultValue={selectedOptionArbitration}
            >
              {renderArbitrationList}
            </Radio.Group>
          </div>
          <div style={{ margin: 16 }}>
            <h3>Bạn có muốn thêm combo nước để tiết kiệm chi phí?</h3>
            <Radio.Group
              onChange={(e) => setSelectedOptionCombo(e.target.value)}
              /* defaultValue={selectedOptionArbitration} */
            >
              {renderComboList}
            </Radio.Group>
          </div>
          <div
            style={{
              padding: "0px 10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <h5> Hóa đơn</h5>
            <div>
              Giá gốc: {parseFloat(pitchDetail.data.price).toLocaleString()}
            </div>
            <div>
              Thuê trọng tài:
              {parseFloat(bonusPrice).toLocaleString()}{" "}
            </div>
            <div>
              Combo Nước uống:
              {parseFloat(bonusPriceCombo).toLocaleString()}{" "}
            </div>
            <div>
              Tổng Cộng hóa đơn:
              {parseFloat(productPriceCombo).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      {renderPitchOrder()}
      <Button onClick={() => handleBookingPitch(id)}>Đặt sân</Button>
    </>
  );
};

export default TimeSelect;
