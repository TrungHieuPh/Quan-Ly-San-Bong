import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "moment/locale/vi";

import AdminLayout from "./LayOut/AdminLayout";
import LoginLayout from "./LayOut/LoginLayout";

import AdminPitchListPage from "./page/Admin/PitchList";
import PitchListPage from "./page/User/PitchListPage";
import UpdatePitch from "./page/Admin/PitchList/UpdatePitch";

import HomePage from "./page/HomePage";
import About from "./page/About";
import PitchHistory from "./page/PitchHistory";
import SetPitch from "./page/SetPitchList/SetPitch";
import HomePitch from "./page/SetPitchList/HomePitch";
import CreatePitch from "./page/Admin/PitchList/CreatePitch";
import EventPage from "./page/EventPage";
import Blog from "./page/Blog";
import Blogging from "./page/Blog/Blogging";
import BlogDetail from "./page/Blog/BlogDetail";
import UserPage from "./page/UserPage";

import CheckoutPitch from "./page/SetPitchList/CheckoutPitch";
import Profile from "./page/profile";

import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import { ROUTES } from "./constants/routers";
import { getUserInfoAction } from "./redux/actions";
import UserLayout from "./LayOut/UserLayout";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={styles.globalContainer}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<div>Dashboard</div>} />
          <Route
            path={ROUTES.ADMIN.PITCH_LIST}
            element={<AdminPitchListPage />}
          />
        </Route>

        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.PITCH_LIST} element={<HomePitch />} />
          <Route path={ROUTES.USER.PITCH_HISTORY} element={<PitchHistory />} />
          <Route path={ROUTES.USER.PITCH_ABOUT} element={<About />} />
          <Route path={ROUTES.USER.SET_PITCH} element={<SetPitch />} />
          <Route path={ROUTES.USER.EVENT} element={<EventPage />} />
          <Route path={ROUTES.USER.BLOG} element={<Blog />} />
          <Route path={ROUTES.USER.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path={ROUTES.USER.USER_PAGE} element={<UserPage />} />

          <Route path={ROUTES.USER.CREATE_PITCH} element={<CreatePitch />} />
          <Route path={ROUTES.USER.BLOGGING} element={<Blogging />} />
          <Route path={ROUTES.ADMIN.UPDATE_PITCH} element={<UpdatePitch />} />

          <Route path={ROUTES.USER.PROFILE} element={<Profile />} />

          <Route
            path={ROUTES.USER.PRODUCT_LIST_PAGE}
            element={<PitchListPage />}
          />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPitch />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
