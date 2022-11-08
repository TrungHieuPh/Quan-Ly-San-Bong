import React from "react";
import {
  Form,
  Button,
  Input,
  Card,
  Space,
  Col,
  Dropdown,
  Menu,
  Steps,
  Tabs,
  Table,
} from "antd";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";
import { ROUTES } from "../../constants/routers";
import moment from "moment";
import "antd/dist/antd.css";
import {
  FaFutbol,
  FaCalendarDay,
  FaCheckCircle,
  FaDollarSign,
  FaClock,
  FaBook,
  FaIdCard,
  FaUserCircle,
  FaKey,
} from "react-icons/fa";
import { getOderListAction, getPitchDetailAction } from "../../redux/actions";
import * as S from "./style";
import piture7 from "../../Images/piture7.jpg";

const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const { bookingList } = useSelector((state) => state.booking);
  const { pitchDetail } = useSelector((state) => state.product);
  console.log(userInfo.data, " + userInfo");
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOderListAction({ userId: userInfo.data.id }));
      dispatch(getPitchDetailAction());
    }
  }, [userInfo.data]);

  const tableColumns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "id",
      key: "id",
    },
    /*   {
      title: "Product Count",
      dataIndex: "orderProducts",
      key: "orderProducts",
      render: (orderProducts) => `${orderProducts.length} products`,
    }, */
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];

  return (
    <div style={{ backgroundColor: "white " }}>
      <div>ProfilePage</div>
      <Tabs tabPosition="left">
        <Tabs.TabPane tab="Info" key="1">
          <S.Image style={{ backgroundImage: `url(${piture7})` }} />
          <img
            src={piture7}
            width="100%"
            height="100px"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Order history" key="2">
          <Table
            columns={tableColumns}
            dataSource={bookingList.data}
            rowKey="id"
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <ul>
                  {record.orderProducts.map((item) => (
                    <li key={item.id}>
                      {item.productName}
                      {item.optionName && ` - ${item.optionName}`}
                      {` - ${item.price}`}
                      {` - ${item.quantity}`}
                      {` - ${item.price * item.quantity}`}
                    </li>
                  ))}
                </ul>
              ),
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
