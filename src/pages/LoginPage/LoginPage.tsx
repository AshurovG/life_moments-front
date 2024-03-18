import { useRef } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Button from "components/Button";
import styles from "./LoginPage.module.scss";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);

  const forma = useForm({
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = forma;
  const { isValid, touchedFields, errors } = formState;

  const onSubmit = (data: FieldValues) => {
    console.log(data.username);
    console.log(data.password);
    navigate("/events");
  };

  return (
    <div className={styles.auth__page}>
      <div className={styles["auth__page-wrapper"]}>
        <h1 className={styles["auth__page-title"]}>Вход в аккаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
            {errors?.password && touchedFields.password && (
              <div className={styles["auth__page-form-input-message"]}>
                {errors?.password?.message?.toString()}
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
            <Link className={styles["auth__page-form-link"]} to="/">
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
