import {
  Button,
  Card,
  Col,
  Space,
  Radio,
  Form,
  DatePicker,
  Drawer,
  Descriptions,
  PageHeader,
  Statistic,
  Select,
  Tabs,
  Result,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  Link,
  generatePath,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd-notifications-messages";
import Moment from "react-moment";
import moment from "moment";
import { ROUTES } from "../../../constants/routers";

import {
  FaSmile,
  FaFrown,
  FaMeh,
  FaCommentDots,
  FaFile,
  FaCalendarDay,
  FaSignal,
  FaUserPlus,
  FaPeopleArrows,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";

import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";
import document from "../../../Images/document.gif";

import {
  getPitchDetailAction,
  bookingPitchAction,
  getOderListAction,
} from "../../../redux/actions";
function SetPitch() {
  const [selectedOption, setSelectedOption] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [tabs, setTabs] = useState("1");

  /*   const dateSelect = moment(dateSelected, ["MM-DD-YYYY", "YYYY-MM-DD"]).format(
    "DD/MM/YYYY"
  ); */
  /*   console.log(dateSelect, "dateSelect"); */
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitchDetail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  console.log(bookingList.data, "booking");

  const [updateForm] = Form.useForm();

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
  }, [id]);
  useEffect(() => {
    dispatch(getOderListAction({ id: id }));
  }, [id]);
  useEffect(() => {
    if (pitchDetail.data.times?.length) {
      setSelectedOption(pitchDetail.data.times[0].id);
    }
  }, [pitchDetail.data]);

  function handleSelectedDate(value) {
    setDateSelected(moment(value).format("DD/MM/YYYY"));
  }

  const handleBookingPitch = (id) => {
    if (!userInfo) {
      alert("Bạn cần đăng nhập!");
    } else if (!dateSelected) {
      alert("Vui lòng chọn ngày đặt sân");
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

  const renderPitchOrder = () => {
    let isDisabled = false;
    if (dateSelected)
      Array.from(bookingList.data).forEach((bookingItem, bookingIndex) => {
        console.log(typeof bookingItem.idTime, "bookingItem");
        if (
          moment(dateSelected, "DD/MM/YYYY").unix() ===
            moment(bookingItem.timeSelect, "DD/MM/YYYY").unix() &&
          selectedOption === bookingItem.idTime
        ) {
          isDisabled = true;
        }
      });
    console.log(isDisabled, "isDisabled");

    return (
      <>
        <div>
          {isDisabled && (
            <Button
              type="primary"
              disabled
              danger
              style={{ fontSize: 20, height: 50 }}
            >
              Sân Đã được Đặt
            </Button>
          )}
          {!isDisabled && (
            <Button
              type="primary"
              danger
              style={{ fontSize: 20, height: 50 }}
              onClick={showDrawer}
            >
              Đặt Sân
            </Button>
          )}
        </div>
      </>
    );
    /*  }); */
  };

  const renderTimeShootOptions = useMemo(() => {
    return pitchDetail.data.times?.map((item, index) => {
      return (
        /*  <Col span={24} key={item.id}> */
        <Select.Option name="option" value={item.name}>
          {item.name}
        </Select.Option>
        /*  </Col> */
      );
    });
  }, [pitchDetail.data]);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const showDrawer = () => {
    if (!dateSelected) {
      alert("Vui lòng chọn ngày đặt sân");
    } else {
      setOpen(true);
    }
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };

  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Tên ">
        {userInfo.data.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Địa chỉ sân">
        {pitchDetail.data.address}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{userInfo.data.email}</Descriptions.Item>
      <Descriptions.Item label="Ngày đặt sân">{dateSelected}</Descriptions.Item>
      {/*  <Descriptions.Item label="Địa chỉ ">
        {pitchDetail.data.address}
      </Descriptions.Item> */}
    </Descriptions>
  );
  const abc = <div>abc</div>;
  {
    const extraContent = (
      <div
        style={{
          display: "flex",
          width: "max-content",
          justifyContent: "flex-end",
        }}
      >
        <Statistic
          title="Trạng thái"
          value="padding"
          style={{
            marginRight: 32,
          }}
        />
        <Statistic title="Giá" prefix="$" value={pitchDetail.data.price} />
      </div>
    );
    const Content = ({ children, extra }) => (
      <div className="content" style={{ display: "flex" }}>
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
      </div>
    );
    return (
      <S.Wrapper>
        <S.Main>
          <S.Center>
            <S.BgTitle>
              <h1 style={{ color: "#ffffff", paddingTop: 30 }}>
                {pitchDetail.data?.name}
              </h1>
              <h5 style={{ color: " wheat", position: "relative", bottom: 20 }}>
                Bóng đá | 5 sao
              </h5>
            </S.BgTitle>
          </S.Center>

          <div>
            <S.DetailsThs>
              <img src={document} />
              Hồ sơ của {pitchDetail.data?.name}
            </S.DetailsThs>
            <div>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #ddd",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: 100,
                }}
              >
                <div
                  style={{
                    borderRight: "1px solid #ddd",
                    textAlign: "center",
                    padding: "0px 10px",
                    display: " inherit",
                  }}
                >
                  <h3>Khung giờ:&nbsp;</h3>
                  <Select
                    /*   buttonStyle="solid"
                  optionType="button" */
                    onChange={(e) => setSelectedOption(e.target.value)}
                    placeholder="Khung giờ"
                    style={{ width: 150 }}
                    defaultValue={selectedOption}
                  >
                    {renderTimeShootOptions}
                  </Select>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    borderRight: "1px solid #ddd",
                    padding: "0px 10px",
                    display: " inherit",
                  }}
                >
                  <h3>Ngày đặt sân:&nbsp;</h3>
                  <DatePicker
                    bordered="true"
                    onChange={(values) => handleSelectedDate(values)}
                  />
                </div>
                <div
                  style={{
                    fontSize: 30,
                    padding: "0px 10px",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  <FaDollarSign style={{ color: "#38963F" }} />
                  {pitchDetail.data.price}
                </div>
                <div> {renderPitchOrder()}</div>
              </div>

              {/*      <p>Vị trí: {pitchDetail.data.location.name}</p> */}

              <div
                dangerouslySetInnerHTML={{
                  __html: pitchDetail.data.content,
                }}
              ></div>
              <Drawer
                title="Thông Tin Cá Nhân Người Dùng"
                placement={placement}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    {/* <Button type="primary" onClick={onClose}>
                      OK
                    </Button> */}
                  </Space>
                }
              >
                <PageHeader
                  className="site-page-header-responsive"
                  footer={
                    <Tabs activeKey={tabs}>
                      <Tabs.TabPane
                        tab="Thủ tục thanh toán
"
                        key="1"
                      >
                        <Content extra={extraContent}>
                          {renderContent()}
                          <Button
                            type="primary"
                            danger
                            onClick={() => setTabs("2")}
                          >
                            Tiếp tục
                          </Button>
                        </Content>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Tiếp tục" key="2">
                        <div>
                          <h3>Chọn phương thức thanh toán </h3>
                          <Button
                            type="link"
                            onClick={() => handleBookingPitch(id)}
                          >
                            Thanh toán qua thẻ ngân hàng
                          </Button>
                        </div>
                        <Button
                          type="primary"
                          danger
                          onClick={() => setTabs("1")}
                        >
                          Quay lại
                        </Button>
                      </Tabs.TabPane>
                    </Tabs>
                    /*    <Button
                      type="primary"
                      danger
                      block
                      onClick={() => handleBookingPitch(id)}
                    >
                      Đặt sân ngay
                    </Button> */
                  }
                ></PageHeader>
              </Drawer>
            </div>
          </div>
        </S.Main>
      </S.Wrapper>
    );
  }
}

export default SetPitch;
