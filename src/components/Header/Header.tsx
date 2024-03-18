import React from "react";
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
          <LogoIcon />
          <h4 className={styles.header__title}>Life Moments</h4>
        </div>

        <div className={styles.header__icons}>
          <CompassIcon />
          <HeartIcon />
          <ProfileIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
