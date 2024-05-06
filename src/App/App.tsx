import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserInfoAction, useUserInfo } from "slices/UserSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import LoginPage from "pages/LoginPage";
import RegistrationPage from "pages/RegistrationPage";
import EventsFeedPage from "pages/EventsFeedPage";
import HomePage from "pages/HomePage";
import MomentPage from "pages/MomentPage";
import SearchPage from "pages/SearchPage";
import Header from "components/Header";

function App() {
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);

  const check = async () => {
    try {
      const response = await axios("http://localhost:8000/api/user/info", {
        method: "GET",
        withCredentials: true,
      });
      dispatch(setUserInfoAction(response.data));
      setIsUserInfoLoading(false);
      console.log(response.status);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!Cookies.get("session_id")) {
      setIsUserInfoLoading(false);
    } else {
      check();
    }
  }, [userInfo?.username]);

  return (
    <div className={styles.app}>
      <HashRouter>
        {isUserInfoLoading ? (
          <h1>Загрузка...</h1> // TODO добавить loader
        ) : (
          <>
            {userInfo && <Header />}
            <Routes>
              {userInfo ? (
                <>
                  <Route path="/events" element={<EventsFeedPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  {/* Маршрут для авторизованного пользователя */}
                  <Route path="/home" element={<HomePage isAuthUser />} />{" "}
                  <Route path="/moment" element={<MomentPage />} />
                  {/* Маршрут для страницы выбранного пользователя */}
                  <Route path="/users/">
                    <Route path=":id" element={<HomePage />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/events" replace />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </>
        )}
      </HashRouter>

      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
  );
}

export default App;
