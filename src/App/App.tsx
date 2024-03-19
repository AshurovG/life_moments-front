import { useState } from "react";
import styles from "./App.module.scss";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import RegistrationPage from "pages/RegistrationPage";
import EventsFeedPage from "pages/EventsFeedPage";
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
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
