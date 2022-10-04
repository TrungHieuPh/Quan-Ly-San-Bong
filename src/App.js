import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Header from "./LayOut/Header";
import Footer from "./LayOut/Footer";
import TrangChu from "./page/TrangChu";
import About from "./page/About";
import DatSan from "./page/DatSan";
import LichSu from "./page/LichSu";

function App() {
  return (
    <div className={styles.globalContainer}>
      <Header />

      {/*  <main className={styles.MainContainer}> */}
      <Routes>
        <Route path="/trangchu" element={<TrangChu />} />
        <Route path="/about" element={<About />} />
        <Route path="/datsan" element={<DatSan />} />
        <Route path="/lichsu" element={<LichSu />} />
      </Routes>

      {/* </main> */}

      <Footer />
    </div>
  );
}

export default App;
