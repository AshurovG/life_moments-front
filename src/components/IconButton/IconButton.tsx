import React from "react";
import styles from "./IconButton.module.scss";

const IconButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.icon}>
      {children}
    </div>
  );
};

export default IconButton;
