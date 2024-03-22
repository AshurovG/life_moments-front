import React from "react";
import styles from "./IconButton.module.scss";

const IconButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.icon}>{children}</div>;
};

export default IconButton;
