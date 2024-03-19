import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import LogoIcon from "components/Icons/LogoIcon";
import ProfileIcon from "components/Icons/ProfileIcon";
import HeartIcon from "components/Icons/HeartIcon";
import CompassIcon from "components/Icons/CompassIcon";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles["header__title-block"]}>
          <Link to="/events">
            <LogoIcon />
          </Link>
          <Link to="/events">
            <h4 className={styles.header__title}>Life Moments</h4>
          </Link>
        </div>

        <div className={styles.header__icons}>
          <CompassIcon />
          <HeartIcon />
          <Link to="/home">
            <ProfileIcon />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
