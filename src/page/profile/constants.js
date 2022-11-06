import { ROUTES } from "../../constants/routers";
import { FaKey, FaIdCard, FaClock } from "react-icons/fa";
import Info from "./component/Info";
import History from "./component/History";
import ChangePassword from "./component/ChangePassword";

export const TAB_ITEMS = [
  /*   {
    title: "Dashboard",
    path: ROUTES.ADMIN.DASHBOARD,
    icon: <FaDigitalTachograph />,
  },
  {
    title: "User Manage",
    path: ROUTES.ADMIN.USER_LIST,
    icon: <FaUser />,
  },
  {
    title: "Product Manage",
    path: ROUTES.ADMIN.PITCH_LIST,
    icon: <FaListAlt />,
  }, */
  {
    title: "Thông tin cá nhân",
    icon: <FaIdCard />,
    path: ROUTES.USER.PROFILE,
    component: <Info />,
    value: 0,
  },
  {
    title: "Lịch sử đơn hàng",
    icon: <FaClock />,
    path: ROUTES.USER.PITCH_HISTORY,
    component: <History />,
    value: 1,
  },
  {
    title: "Đổi mật khẩu",
    icon: <FaKey />,
    /*   component: <ChangePassword />, */
    value: 5,
  },
  /* {
    title: "Sản phẩm yêu thích",
    icon: <HeartOutlined />,
    value: 2,
  },
  {
    title: "Sổ địa chỉ",
    icon: <EnvironmentOutlined />,
    value: 3,
  },
  {
    title: "Thông tin thanh toán",
    icon: <CreditCardOutlined />,
    value: 4,
  },
  {
    title: "Đổi mật khẩu",
    icon: <KeyOutlined />,
    value: 5,
  }, */
];
