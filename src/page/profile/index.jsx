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
} from "antd";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { getOderListAction } from "../../redux/actions";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";
import { ROUTES } from "../../constants/routers";
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
import * as S from "./style";
import Info from "./component/Info";
import History from "./component/History";
import ChangePassword from "./component/ChangePassword";
import { TAB_ITEMS } from "./constants";

const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo.data, " + userInfo");
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { bookingList } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(
      getOderListAction({
        params: {
          page: 1,
          limit: PITCH_LIST_LIMIT,
        },
      })
    );
  }, []);
  const renderSidebarItems = () => {
    return TAB_ITEMS.map((item, index) => {
      return (
        <S.SidebarItem
          key={index}
          to={item.path}
          active={pathname === item.path}
        >
          {item.icon}

          {item.title}
        </S.SidebarItem>
      );
    });
  };
  const renderPathItems = () => {
    return TAB_ITEMS.map((item, index) => {
      console.log(item.component, "aaaa");
      return (
        <S.SidebarItem key={index} active={pathname === item.path}>
          {item.component}
        </S.SidebarItem>
      );
    });
  };
  const renderCheckoutContent = useMemo(() => {
    switch (tabs) {
      case 1: {
        return <History setTabs={setTabs} />;
      }
      case 2: {
        return <ChangePassword setTabs={setTabs} />;
      }

      case 0:
      default: {
        return <Info setTabs={setTabs} />;
      }
    }
  }, [tabs]);

  return (
    <S.WrapperProfile>
      <div>
        <h1 className="header">
          <FaIdCard />
          Thông tin cá nhân{" "}
        </h1>
        {userInfo.data.fullName ? (
          <S.ContainerProfile>
            <S.LeftProfile>
              <div>
                <S.AvatarContainer>
                  <FaUserCircle size={150} />
                  <h2
                    style={{
                      color: "#fa541c",
                      border: "1px solid #fa541c",
                      padding: 8,
                    }}
                  >
                    {userInfo.data.fullName}
                  </h2>
                </S.AvatarContainer>

                {/* <S.SidebarItem>
                  <div>
                    <FaIdCard />
                    Thông tin cá nhân
                  </div>
                </S.SidebarItem>
                <S.SidebarItem>
                  <div>
                    <FaClock /> Lịch sử đơn hàng
                  </div>
                </S.SidebarItem>
                <S.SidebarItem>
                  <div>
                    <FaKey /> Đổi mật khẩu"
                  </div>
                </S.SidebarItem> */}
                {renderSidebarItems()}
              </div>
            </S.LeftProfile>

            <S.RightContainer> </S.RightContainer>
            {/*   <div>
              {" "}
              <div>Tên: &nbsp; {userInfo.data.fullName}</div>
              <div>Email: &nbsp;{userInfo.data.email}</div>
              <div>Quyền: &nbsp;{userInfo.data.role}</div>
              <div>Tên: &nbsp;{userInfo.data.email}</div>
            </div> */}
          </S.ContainerProfile>
        ) : (
          <div>Bạn chưa đăng nhập</div>
        )}
      </div>
    </S.WrapperProfile>
  );
};

export default Profile;
