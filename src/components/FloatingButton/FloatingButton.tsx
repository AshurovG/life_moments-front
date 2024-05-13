import React from "react";
import styles from "./FloatingButton.module.scss";

const FloatingButton = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; onClick: () => void }
>((props, ref) => {
  return (
    <button {...props} ref={ref} className={styles.btn} onClick={props.onClick}>
      {props.children} {/* Используем children из props */}
    </button>
  );
});

export default FloatingButton;
