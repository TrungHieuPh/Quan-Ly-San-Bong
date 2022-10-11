import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import styles from "./App.module.css";
import Header from "./LayOut/Header";
import TrangChu from "./page/TrangChu";
import About from "./page/About";
import LichSu from "./page/LichSu";
import DatSan from "./page/DatSan/HomePitch";
import SetPitch from "./page/DatSan/SetPitch";
import CreatePitch from "./page/DatSan/CreatePitch";
import DetailSetPitch from "./page/DatSan/SetPitch/detailSetPitch";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import AdminLayout from "./LayOut/AdminLayout";
import LoginLayout from "./LayOut/LoginLayout";
import { ROUTES } from "./constants/routers";
import { getUserInfoAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
  }, []);
  return (
    <div className={styles.globalContainer}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/header" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/datsan" element={<DatSan />} />
          <Route path="/lichsu" element={<LichSu />} />
          <Route path="/datsan/createpitch" element={<CreatePitch />} />
          <Route path="/datsan/:id/setpitch" element={<SetPitch />} />
          <Route
            path="/datsan/:id/setpitch/detail"
            element={<DetailSetPitch />}
          />
        </Route>

        <Route element={<LoginLayout />}>
          {/*   <Route
                path={ROUTES.ADMIN.DASHBOARD}
                element={<div>dasboard</div>}
              ></Route>
              <Route
                path={ROUTES.ADMIN.PRODUCT_LIST}
                element={<TrangChu />}
              ></Route> */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
