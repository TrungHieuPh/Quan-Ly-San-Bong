import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.css";

import Header from "./LayOut/Header";
import Footer from "./LayOut/Footer";
import TrangChu from "./page/TrangChu";
import About from "./page/About";
import LichSu from "./page/LichSu";
import DatSan from "./page/DatSan/HomePitch";
import SetPitch from "./page/DatSan/SetPitch";
import CreatePitch from "./page/DatSan/CreatePitch";

function App() {
  return (
    <div className={styles.globalContainer}>
      <Header />

      <main className={styles.MainContainer}>
        <Routes>
          <Route path="/" element={<Navigate to={"/trangchu"} />} />
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/header" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/datsan" element={<DatSan />} />
          <Route path="/lichsu" element={<LichSu />} />
          <Route path="/datsan/createpitch" element={<CreatePitch />} />
          <Route path="/datsan/:id/setpitch" element={<SetPitch />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
