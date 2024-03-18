import { useState } from "react";
import styles from "./App.module.scss";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import EventsFeedPage from "pages/EventsFeedPage";

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Routes>
          <Route path="/events" element={<EventsFeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
