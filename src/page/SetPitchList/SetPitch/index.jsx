import {
  Button,
  Space,
  Form,
  DatePicker,
  Drawer,
  Descriptions,
  PageHeader,
  Statistic,
  Select,
  Tabs,
  Spin,
  Input,
  Rate,
  notification,
  Col,
  Card,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ROUTES } from "../../../constants/routers";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaCommentDots, FaUser, FaDollarSign } from "react-icons/fa";

import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";
import document from "../../../Images/document.gif";

import {
  getPitchDetailAction,
  bookingPitchAction,
  getOderListAction,
  favoritePitchAction,
  getReviewListAction,
  unFavoritePitchAction,
  postReviewAction,
} from "../../../redux/actions";
function SetPitch() {
  const [selectedOption, setSelectedOption] = useState();
  console.log(selectedOption, "selected");
  const [tabs, setTabs] = useState("1");
  const [open, setOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState();
  const { reviewList } = useSelector((state) => state.review);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitchDetail } = useSelector((state) => state.product);
  const { pitch } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);

  console.log(pitchDetail.data.favorites, "a");
  //kiểm tra đã đăng nhập chưa
  const isLike = userInfo.data.id
    ? pitchDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
    dispatch(getReviewListAction({ pitchId: id }));
    dispatch(getOderListAction({ id: id }));
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
          timeSelect: pitch.dateSelected || dateSelected || dateSelected,
          timeId: selectedOption,
          userId: userInfo.data.id,
        })
      );
    }
    alert("đặt sân thành công");
    navigate(ROUTES.USER.PITCH_LIST);
  };

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = pitchDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoritePitchAction({
              id: favoriteData.id,
              pitchId: pitchDetail.data.id,
            })
          );
        }
      } else {
        dispatch(
          favoritePitchAction({
            userId: userInfo.data.id,
            pitchId: pitchDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };
  const handlePostReview = (values) => {
    dispatch(
      postReviewAction({
        ...values,
        userId: userInfo.data.id,
        productId: pitchDetail.data.id,
      })
    );
  };

  const renderPitchOrder = () => {
    let isDisabled = false;
    if (pitch.dateSelected || dateSelected)
      Array.from(bookingList.data).forEach((bookingItem, bookingIndex) => {
        console.log(typeof bookingItem.timeId, "bookingItem");
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
                Đặt Sân
              </Button>
            )}
            {!isDisabled && (
              <Button
                onClick={() => navigate(`/checkout/${id}`)}
                /*   htmlType="submit" */
                type="primary"
                danger
                style={{ fontSize: 30, height: 60 }}
              >
                Đặt Sân
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      return (
        <div style={{ margin: 16, borderBottom: ".2px solid #e0dddd8f" }}>
          <Space>
            <h3>
              <FaUser />
              {item.user.fullName}
            </h3>
            <h4>{moment(item.createdAt).fromNow()}</h4>
          </Space>
          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <div>{item.comment}</div>
        </div>
      );
    });
  }, [reviewList.data]);

  const renderTimeShootOptions = useMemo(() => {
    return pitchDetail.data.times?.map((item, index) => {
      return (
        /*  <Col span={24} > */
        <Select.Option key={item.id} name="option" value={item.id}>
          {item.name}
        </Select.Option>
        /*  </Col> */
      );
    });
  }, [pitchDetail.data]);

  const onClose = () => {
    setOpen(false);
  };
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

    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Tên ">
          {userInfo.data.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ sân">
          {pitchDetail.data.address}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {userInfo.data.email}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt sân">
          {dateSelected || pitch.dateSelected}
        </Descriptions.Item>
      </Descriptions>
    );
    const renderProductImages = useMemo(() => {
      if (!pitchDetail.data.images?.length) return null;
      return pitchDetail.data.images?.map((item) => {
        return (
          <img
            key={item.id}
            src={item.url}
            alt={item.name}
            style={{ width: "70%", height: "500px", margin: 16 }}
          />
        );
      });
    }, [pitchDetail.data]);
    const day = new Date();
    day.setDate(day.getDate());
    const disabledDate = (current) => {
      return current && current.valueOf() < day;
    };

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
          <Spin spinning={pitchDetail.loading}>
            <div>
              <div>
                <Form onFinish={() => setOpen(true)}>
                  <S.SearchBooking>
                    <S.SearchItem>
                      <h3>Khung giờ ?</h3>
                      <Form.Item
                        label=""
                        name="time"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn khung giờ",
                          },
                        ]}
                      >
                        <Select
                          onChange={(value) => setSelectedOption(value)}
                          placeholder="Khung giờ"
                          style={{ width: "100%" }}
                          defaultValue={selectedOption}
                        >
                          {renderTimeShootOptions}
                        </Select>
                      </Form.Item>
                    </S.SearchItem>
                    <S.SearchItem>
                      <h3>Khung giờ ?</h3>
                      <Form.Item
                        label=""
                        name="dateSelected"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn ngày ",
                          },
                        ]}
                      >
                        <DatePicker
                          bordered="true"
                          disabledDate={disabledDate}
                          style={{ width: "100%" }}
                          onChange={(values) => handleSelectedDate(values)}
                          defaultValue={dateSelected}
                        />
                      </Form.Item>
                    </S.SearchItem>
                    <div>
                      <Button
                        size="large"
                        danger={isLike}
                        bordered="false"
                        icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                        onClick={() => handleToggleFavorite()}
                      >
                        {pitchDetail.data?.favorites?.length || 0}
                      </Button>
                    </div>
                    <div
                      style={{
                        fontSize: 38,
                        padding: "0px 10px",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                      <FaDollarSign style={{ color: "#38963F" }} />
                      {parseFloat(pitchDetail.data.price).toLocaleString()}
                    </div>
                    <div> {renderPitchOrder()}</div>
                  </S.SearchBooking>
                </Form>
                {/*      <p>Vị trí: {pitchDetail.data.location.name}</p> */}
                <S.DetailsThs>
                  <img
                    src={document}
                    style={{ width: 80, height: 80 }}
                    alt=""
                  />
                  Hồ sơ của {pitchDetail.data?.name}
                </S.DetailsThs>
                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    style={{ width: "30%", fontSize: 20 }}
                    dangerouslySetInnerHTML={{
                      __html: pitchDetail.data.content,
                    }}
                  ></div>
                  <div
                    style={{
                      width: "65%",
                      display: "flex",
                      flexDirection: " column",
                      alignItems: "center",
                    }}
                  >
                    {renderProductImages}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: " white",
                    boxShadow: " rgb(0 0 0 / 50%) -1px 1px 3px",
                    borderRadius: 5,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <FaCommentDots style={{ width: 30, height: 30 }} />
                    <h2>Bình luận</h2>
                  </div>

                  <div style={{ margin: 16, borderTop: "1px solid #ddd" }}>
                    {" "}
                    {renderReviewList}{" "}
                  </div>
                  <Col
                    span={24}
                    /*   md={{ span: 16, order: 4 }}
                  xs={{ span: 24, order: 4 }} */
                  >
                    <Card
                      size="small"
                      bordered={false}
                      style={{
                        backgroundColor: " #e5e5e5",
                        border: "1px solid #820014",
                        margin: "50px 16px 16px 16px",
                        boxShadow: "rgb(0 0 0 / 50%) -1px 1px 10px",
                        borderRadius: 1,
                      }}
                      actions={<EditOutlined />}
                      title="Viết bình luận tại đây !!!"
                    >
                      {userInfo.data.id && (
                        <S.CustomForm
                          layout="vertical"
                          onFinish={(values) => handlePostReview(values)}
                        >
                          <Form.Item label="Đánh giá sao" name="rate">
                            <Rate />
                          </Form.Item>
                          <Form.Item label="Bình luận" name="comment">
                            <Input.TextArea
                              autoSize={{ maxRows: 6, minRows: 2 }}
                            />
                          </Form.Item>
                          <Button type="primary" htmlType="submit" block>
                            Submit
                          </Button>
                        </S.CustomForm>
                      )}
                    </Card>
                  </Col>
                </div>
                <Drawer
                  title="Thông Tin Cá Nhân Người Dùng"
                  placement="top"
                  width={500}
                  onClose={onClose}
                  open={open}
                  extra={
                    <Space>
                      <Button onClick={onClose}>Cancel</Button>
                    </Space>
                  }
                >
                  <PageHeader
                    className="site-page-header-responsive"
                    footer={
                      <Tabs activeKey={tabs}>
                        <Tabs.TabPane tab="Thủ tục thanh toán" key="1">
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
                    }
                  ></PageHeader>
                </Drawer>
              </div>
            </div>
          </Spin>
        </S.Main>
      </S.Wrapper>
    );
  }
}

export default SetPitch;
