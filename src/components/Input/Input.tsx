import React from "react";
import styles from "./Input.module.scss";

const Input = () => {
  return (
    <input
      placeholder={"Оставьте комментарий..."}
      className={styles.input}
    ></input>
  );
};

export default Input;
