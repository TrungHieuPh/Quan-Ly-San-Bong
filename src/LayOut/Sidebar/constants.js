import { ROUTES } from "../../constants/routers";
import { FaDigitalTachograph, FaUser, FaListAlt } from "react-icons/fa";

export const SIDEBAR_ITEMS = [
  {
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
  },
];
