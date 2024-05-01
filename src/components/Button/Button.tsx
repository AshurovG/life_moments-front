import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(styles["button"], className)}
    >
      {children}
    </button>
  );
};

export default Button;
