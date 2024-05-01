import styles from "./App.module.scss";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "pages/LoginPage";
import RegistrationPage from "pages/RegistrationPage";
import EventsFeedPage from "pages/EventsFeedPage";
import HomePage from "pages/HomePage";
import MomentPage from "pages/MomentPage";
import SearchPage from "pages/SearchPage";
import Header from "components/Header";

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/events" element={<EventsFeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          {/* Маршрут для страницы выбранного пользователя */}
          <Route path="/users/">
            <Route path=":id" element={<HomePage />} />
          </Route>
          {/* Маршрут для авторизованного пользователя */}
          <Route path="/home" element={<HomePage isAuthUser />} />{" "}
          <Route path="/moment" element={<MomentPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </HashRouter>

      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
  );
}

export default App;
