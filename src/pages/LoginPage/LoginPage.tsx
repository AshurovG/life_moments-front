import { useRef } from "react";
import axios from "axios";
import { useForm, FieldValues } from "react-hook-form";
import styles from "./LoginPage.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);

  const forma = useForm({
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = forma;
  const { isValid, touchedFields, errors } = formState;

  const loginUser = async (data: FieldValues) => {
    const sendingData = {
      username: data.username,
      password: data.password,
    };

    try {
      const response = await axios("http://127.0.0.1:8000/api/user/login", {
        method: "POST",
        data: sendingData,
        withCredentials: true,
      });

      toast.success("Вы успешно вошли в аккаунт!");
      navigate("/events");
    } catch {
      toast.error("Неверное имя пользователя или пароль!");
    }
  };

  return (
    <div className={styles.auth__page}>
      <div className={styles["auth__page-wrapper"]}>
        <h1 className={styles["auth__page-title"]}>Вход в аккаунт</h1>
        <form
          onSubmit={handleSubmit(loginUser)}
          ref={form}
          className={styles["auth__page-form"]}
        >
          <div style={{ position: "relative", width: `100%` }}>
            <input
              {...register("username", {
                required: "Обязательное поле",
              })}
              className={styles["auth__page-form-input"]}
              placeholder="Имя пользователя / почта*"
              type="text"
            />
            {errors?.username && touchedFields.username && (
              <div className={styles["auth__page-form-input-message"]}>
                {errors?.username?.message?.toString()}
              </div>
            )}
          </div>

          <div style={{ position: "relative", width: `100%` }}>
            <input
              {...register("password", {
                required: "Обязательное поле",
              })}
              className={styles["auth__page-form-input"]}
              placeholder="Пароль*"
              type="password"
            />
            {errors?.password && touchedFields.password && (
              <div className={styles["auth__page-form-input-message"]}>
                {errors?.password?.message?.toString()}
              </div>
            )}
          </div>
          <Button
            className={styles["auth__page-form-btn"]}
            disabled={!isValid}
            type="submit"
          >
            Войти
          </Button>
          <div>
            <Link className={styles["auth__page-form-link"]} to="/registration">
              У вас еще нет аккаунта?
            </Link>
            <Link className={styles["auth__page-form-link"]} to="/login">
              Войти через VK
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
