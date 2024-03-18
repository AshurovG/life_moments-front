import { useRef, useState } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import Button from "components/Button";
import styles from "./RegistrationPage.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { MAX_FILE_SIZE } from "../../consts";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const forma = useForm({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState,
  } = forma;
  const { isValid, touchedFields, errors } = formState;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setValue("image", null);
        setError("image", {
          type: "manual",
          message: "Размер файла не должен превышать 5 МБ",
        });
        setSelectedFile(null);
        setImageSrc(null); // Очищаем источник изображения
      } else {
        setSelectedFile(file);
        clearErrors("image");
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setImageSrc(e.target.result as string); // Устанавливаем источник изображения
          }
        };
        reader.readAsDataURL(file); // Читаем файл как Data URL
      }
    } else {
      setSelectedFile(null);
      clearErrors("image");
      setImageSrc(null); // Очищаем источник изображения
    }
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data.email);
    console.log(data.username);
    console.log(data.password);
    navigate("/events");
  };

  return (
    <div className={styles.auth__page}>
      <div className={styles["auth__page-wrapper"]}>
        <h1 className={styles["auth__page-title"]}>Регистрация</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={form}
          className={styles["auth__page-form"]}
        >
          <div style={{ position: "relative", width: `100%` }}>
            <input
              {...register("email", {
                required: "Обязательное поле",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Регулярное выражение для проверки формата электронной почты
                  message: "Неверный формат электронной почты",
                },
              })}
              className={styles["auth__page-form-input"]}
              placeholder="E-mail*"
              type="email"
            />
            {errors?.email && touchedFields.email && (
              <div className={styles["auth__page-form-input-message"]}>
                {errors?.email?.message?.toString()}
              </div>
            )}
          </div>
          <div style={{ position: "relative", width: `100%` }}>
            <input
              {...register("username", {
                required: "Обязательное поле",
              })}
              className={styles["auth__page-form-input"]}
              placeholder="Имя пользователя*"
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
          <div className={styles["auth__page-form-file-block"]}>
            <div className={styles["auth__page-form-file"]}>
              <Controller
                control={control}
                name="image"
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <input
                      {...field}
                      type="file"
                      id="input"
                      accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFileChange(e);
                      }}
                    />
                    <label htmlFor="input">{<>Выберите аватарку</>}</label>
                    {error && (
                      <div className={styles["auth__page-form-file-message"]}>
                        {error.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <img
              src={
                imageSrc ||
                "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg"
              }
              alt="user"
            />
          </div>

          <Button
            className={styles["auth__page-form-btn"]}
            disabled={!isValid}
            type="submit"
          >
            Зарегистрироваться
          </Button>
          <div>
            <Link className={styles["auth__page-form-link"]} to="/login">
              У вас уже есть аккаунт?
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

export default RegistrationPage;
