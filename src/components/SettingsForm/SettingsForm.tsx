import React, { useRef, useState, useEffect } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import Button from "components/Button";
import styles from "./SettingsForm.module.scss";
import { SettingsData } from "types";
import { useNavigate, Link } from "react-router-dom";
import { MAX_FILE_SIZE } from "../../consts";

type SettingsFormProps = {
  username?: string;
  email?: string;
  description?: string;
  image: string;
  active: boolean;
  handleSaveClick: (data: SettingsData) => void;
  handleLogoutClick?: () => void;
};

const SettingsForm: React.FC<SettingsFormProps> = ({
  username,
  email,
  description,
  image,
  active,
  handleLogoutClick,
  handleSaveClick,
}) => {
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
    reset,
  } = forma;
  const { isValid, touchedFields, errors } = formState;

  useEffect(() => {
    if (!active) {
      reset({
        username: username,
        email: email,
        description: description,
      });
    }
  }, [active]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setValue("image", null);
        setError("image", {
          type: "manual",
          message: "Размер файла не должен превышать 10 МБ",
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
      setImageSrc(null);
    }
  };

  const onSubmit = (data: FieldValues) => {
    const dataForSending = {
      ...(data.username !== username ? { username: data.username } : {}),
      ...(data.email !== email ? { email: data.email } : {}),
      ...(data.description !== description
        ? { description: data.description }
        : {}),
      ...(selectedFile ? { profile_picture: selectedFile } : {}),
    };
    if (dataForSending) {
      handleSaveClick(dataForSending);
      navigate("/home");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={form}
      className={styles["form"]}
    >
      <div style={{ position: "relative", width: `100%` }}>
        <input
          {...register("username", {
            required: "Обязательное поле",
            maxLength: {
              value: 30,
              message: "Имя пользователя не должно превышать 30 символов",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "Неверный формат имени пользователя",
            },
          })}
          className={styles["form__input"]}
          placeholder="Имя пользователя*"
          type="text"
        />
        {errors?.username && touchedFields.username && (
          <div className={styles["form__input-message"]}>
            {errors?.username?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <input
          {...register("email", {
            required: "Обязательное поле",
            maxLength: {
              value: 256,
              message: "Почта не должна превышать 256 символов",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Неверный формат email",
            },
          })}
          className={styles["form__input"]}
          placeholder="Email*"
          type="email"
        />
        {errors?.email && touchedFields.email && (
          <div className={styles["form__input-message"]}>
            {errors?.email?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <textarea
          {...register("description", {
            maxLength: {
              value: 150,
              message: "Описание не должно превышать 150 символов",
            },
          })}
          className={styles["form__textarea"]}
          placeholder="Описание профиля*"
        />
        {errors?.description && touchedFields.description && (
          <div className={styles["form__input-message"]}>
            {errors?.description?.message?.toString()}
          </div>
        )}
      </div>

      <div className={styles["form__file-block"]}>
        <div className={styles["form__file"]}>
          <Controller
            control={control}
            name="image"
            // rules={{
            //   // required: "Обязательное поле",
            // }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  type="file"
                  id="input"
                  accept="image/jpeg, image/png, image/bmp, image/webp, image/avif"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e);
                  }}
                />
                <label style={{ cursor: "pointer" }} htmlFor="input">
                  {<>Измените фото профиля</>}
                </label>
                {error && (
                  <div className={styles["form__file-message"]}>
                    {error.message}
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {image && !imageSrc ? (
          <img src={image} alt="user" />
        ) : (
          imageSrc && <img src={imageSrc} alt="user" />
        )}
      </div>

      <Button className={styles["form__btn"]} disabled={!isValid} type="submit">
        Сохранить
      </Button>

      <p onClick={handleLogoutClick} className={styles.form__logout}>
        Выйти из аккаунта
      </p>
    </form>
  );
};

export default SettingsForm;
