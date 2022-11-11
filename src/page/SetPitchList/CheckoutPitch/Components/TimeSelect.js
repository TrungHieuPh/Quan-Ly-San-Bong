import { useEffect, useMemo, useState } from "react";
import { Button, Row, Calendar, Avatar, Radio, Col, Form, Item } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import * as S from "../styles";
import "antd-notifications-messages/lib/styles/style.css";

import {
  getPitchDetailAction,
  getOderListAction,
  getArbitrationAction,
  getComboAction,
  setCheckoutTimeSelectAction,
} from "../../../../redux/actions";
import { ROUTES } from "../../../../constants/routers";
const TimeSelect = ({ setStep }) => {
  const dispatch = useDispatch();
  const { pitchDetail } = useSelector((state) => state.product);
  console.log(pitchDetail, "pitchDetail");
  const { pitch } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { arbitrationList } = useSelector((state) => state.arbitration);
  const { comboList } = useSelector((state) => state.combo);

  const { id } = useParams();
  const [form] = Form.useForm();
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

  const handleSubmitTimeSelectForm = (values) => {
    console.log(
      {
        ...values,
        date: dateSelected,
        totalPrice: parseInt(productPriceCombo),
        pitchBonus: {
          arbitrationSelect: selectedOptionArbitration
            ? arbitrationList.data.find(
                (item) => item.id === selectedOptionArbitration
              )
            : 0,
          comboSelect: selectedOptionCombo
            ? comboList.data.find((item) => item.id === selectedOptionCombo)
            : 0,
        },
      },
      "av "
    );

    dispatch(
      setCheckoutTimeSelectAction({
        ...values,
        date: dateSelected,
        totalPrice: parseInt(productPriceCombo),
        pitchBonus: {
          arbitrationSelect: selectedOptionArbitration
            ? arbitrationList.data.find(
                (item) => item.id === selectedOptionArbitration
              )
            : 0,
          comboSelect: selectedOptionCombo
            ? comboList.data.find((item) => item.id === selectedOptionCombo)
            : 0,
        },
      })
    );
    setStep(1);
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
          style={{ margin: 2, fontSize: 13 }}
        >
          {item.name}
        </Radio.Button>
      );
    });
  }, [comboList.data]);

  const renderPitchOrder = () => {
    let isDisabled = false;
    if (dateSelected)
      Array.from(bookingList.data).forEach((bookingItem, bookingIndex) => {
        if (
          moment(dateSelected, "DD/MM/YYYY").valueOf() ===
            moment(bookingItem.date, "DD/MM/YYYY").valueOf() &&
          selectedOption === bookingItem.timeOption
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
                style={{
                  margin: 10,
                  float: "right",
                  boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
                }}
              >
                Tiếp tục
              </Button>
            )}
            {!isDisabled && (
              <Button
                htmlType="submit"
                onClick={() => form.submit()}
                type="primary"
                danger
                style={{
                  margin: 10,
                  float: "right",
                  boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
                }}
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
  }, [pitchDetail.data]);

  const day = new Date();
  day.setDate(day.getDate());
  const disabledDate = (current) => {
    return current && current.valueOf() < day;
  };

  return (
    <>
      <Form
        form={form}
        onFinish={(values) => handleSubmitTimeSelectForm(values)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            margin: "55px 0px 0px  0px",
            backgroundColor: "white",
            boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
          }}
        >
          <div
            style={{
              width: "60%",
              backgroundColor: "#425B76",
              textAlign: "center",
              boxShadow: "rgb(0 0 0 / 80%) -5px 5px 10px",
            }}
          >
            {/*   <Avatar size={100} icon={<UserOutlined />} /> */}
            <S.ItemTitle>Bạn ơi, chọn ngày ở đây !</S.ItemTitle>
            <Form.Item
              label=""
              name="date"
              rules={[
                {
                  required: true,
                  message: "vui lòng chọn ngày đặt sân !",
                },
              ]}
              style={{
                boxShadow: "rgb(0 0 0 / 50%) -1px 1px 7px",
                margin: 16,
                borderRadius: 10,
              }}
            >
              <Calendar
                disabledDate={disabledDate}
                fullscreen={false}
                onChange={(values) => handleSelectedDate(values)}
                defaultValue={dateSelected}
                style={{
                  margin: "30px  60px 60px",
                  backgroundColor: "white",
                }}
              />
            </Form.Item>
          </div>

          <S.WrapperLeft>
            <h2>Thời gian nào là thuận tiện nhất?</h2>
            <Form.Item
              label=""
              name="timeoption"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn khung giờ của sân",
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => setSelectedOption(e.target.value)}
                defaultValue={selectedOption}
                style={{
                  /*    position: "relative",
              top: 75, */
                  padding: 25,
                  textAlign: "center",
                  display: "flex",
                  flexdirection: "column",
                  boxShadow: "rgb(0 0 0 / 50%) -1px 1px 7px",
                  backgroundColor: "whitesmoke",
                  borderRadius: 5,
                }}
              >
                {renderTimeShootOptions}
              </Radio.Group>
            </Form.Item>
            <S.ItemArbitration>
              <h3>Bạn có muốn thêm trọng tài?</h3>
              <Radio.Group
                onChange={(e) => setSelectedOptionArbitration(e.target.value)}
                defaultValue={selectedOptionArbitration}
              >
                {renderArbitrationList}
              </Radio.Group>
            </S.ItemArbitration>
            <S.ItemCombo>
              <h3>Bạn có muốn thêm combo nước để tiết kiệm chi phí?</h3>
              <Radio.Group
                style={{ display: "flex", width: "100%" }}
                onChange={(e) => setSelectedOptionCombo(e.target.value)}
                /* defaultValue={selectedOptionArbitration} */
              >
                {renderComboList}
              </Radio.Group>
            </S.ItemCombo>
            <S.ItemReceipt>
              <h2 style={{ borderBottom: "1px solid black " }}> Hóa đơn</h2>
              <h3>
                Giá gốc: {parseFloat(pitchDetail.data.price).toLocaleString()}
              </h3>
              <h4>
                Thuê trọng tài:
                {parseFloat(bonusPrice).toLocaleString()}{" "}
              </h4>
              <h4>
                Combo Nước uống:
                {parseFloat(bonusPriceCombo).toLocaleString()}{" "}
              </h4>
              <h2 style={{ borderTop: "1px solid black" }}>
                Tổng: {parseFloat(productPriceCombo).toLocaleString()}
              </h2>
            </S.ItemReceipt>
          </S.WrapperLeft>
        </div>
      </Form>
      <div>{renderPitchOrder()}</div>
    </>
  );
};

export default TimeSelect;
