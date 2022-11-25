import { useEffect, useMemo, useState } from "react";
import { Button, Row, Calendar, Radio, Col, Form } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
const TimeSelect = ({ setStep }) => {
  const dayss = new Date();
  const setdayss = moment(dayss).format("DD/MM/YYYY HH:mm");
  const dispatch = useDispatch();
  const { pitchDetail } = useSelector((state) => state.product);
  console.log(
    pitchDetail.data?.times?.map((item) => {
      return moment(item.timeend, "HH:mm").valueOf();
    })
  );
  console.log(moment(dayss).valueOf(), "hieu");
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);

  const { arbitrationList } = useSelector((state) => state.arbitration);
  const { comboList } = useSelector((state) => state.combo);

  const { id } = useParams();
  const [form] = Form.useForm();
  const [dateSelected, setDateSelected] = useState(dayss);
  const [selectedOption, setSelectedOption] = useState();
  console.log(selectedOption, "tiep");
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
    setDateSelected(moment(value).format("DD/MM/YYYY HH:mm"));
  }

  const handleSubmitTimeSelectForm = (values) => {
    dispatch(
      setCheckoutTimeSelectAction({
        ...values,
        date: dateSelected,
        timeoption: pitchDetail.data.times?.find(
          (item) => item.id === selectedOption
        ),
        status: "block",
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
          style={{ margin: 6, fontSize: 12 }}
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
          selectedOption === bookingItem.timeOption?.id
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

  const disabledDateb = pitchDetail.data.times?.map((item, index) => {
    return moment(item.timeend, "HH:mm").valueOf() <=
      moment(setdayss, "DD/MM/YYYY HH:mm").valueOf() &&
      moment(dateSelected, "DD/MM/YYYY").valueOf() ===
        moment(setdayss, "DD/MM/YYYY").valueOf()
      ? true
      : false;
  });
  console.log(disabledDateb, "a");
  const renderTimeShootOptions = useMemo(() => {
    return pitchDetail.data.times?.map((item, index) => {
      return (
        <Radio.Button
          disabled={
            moment(item.timeend, "HH:mm").valueOf() <=
              moment(setdayss, "DD/MM/YYYY HH:mm").valueOf() &&
            moment(dateSelected, "DD/MM/YYYY").valueOf() ===
              moment(setdayss, "DD/MM/YYYY").valueOf()
              ? true
              : false
          }
          key={item.id}
          name="option"
          value={item.id}
          style={{ margin: "6px 0" }}
        >
          {item.name}
        </Radio.Button>
      );
    });
  }, [pitchDetail.data && dateSelected]);

  const day = new Date();
  const dayFormat = moment(day).format("DD/MM/YYYY");
  const disabledDate = (current) => {
    return (
      current && current.valueOf() < moment(dayFormat, "DD/MM/YYYY").valueOf()
    );
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
            margin: "24px 0px 0px 0px",
            backgroundColor: "white",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col md={{ span: 9, order: 1 }} xs={{ span: 24, order: 1 }}>
              <S.div1>
                <S.ItemTitleTimeSelect>
                  Bạn ơi, chọn ngày ở đây !
                </S.ItemTitleTimeSelect>
                <Form.Item
                  label=""
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "vui lòng chọn ngày đặt sân !",
                    },
                  ]}
                >
                  <Calendar
                    disabledDate={disabledDate}
                    fullscreen={false}
                    onChange={(values) => handleSelectedDate(values)}
                    initialValue={dateSelected}
                    style={{
                      margin: "10px 10px 10px",
                      backgroundColor: "white",
                    }}
                  />
                </Form.Item>
              </S.div1>
            </Col>
            <Col md={{ span: 10, order: 1 }} xs={{ span: 24, order: 2 }}>
              <div
                style={{
                  backgroundColor: "whitesmoke",
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <h3>Thời gian nào là thuận tiện nhất?</h3>
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
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {renderTimeShootOptions}
                  </Radio.Group>
                </Form.Item>
              </div>

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
            </Col>
            <Col md={{ span: 5, order: 1 }} xs={{ span: 24, order: 3 }}>
              <S.ItemReceipt>
                <h2 style={{ borderBottom: "1px solid #ccc " }}> Hóa đơn</h2>
                <h3>
                  Giá gốc: {parseFloat(pitchDetail.data.price).toLocaleString()}
                </h3>
                <h4>
                  Thuê trọng tài: {parseFloat(bonusPrice).toLocaleString()}{" "}
                </h4>
                <h4>
                  Combo Nước uống:{" "}
                  {parseFloat(bonusPriceCombo).toLocaleString()}{" "}
                </h4>
                <h2 style={{ borderTop: "1px solid #ccc", margin: 0 }}>
                  Tổng: {parseFloat(productPriceCombo).toLocaleString()}
                </h2>
              </S.ItemReceipt>
            </Col>
          </Row>
        </div>
        {/*   </div> */}
      </Form>

      <div>{renderPitchOrder()}</div>
    </>
  );
};

export default TimeSelect;
