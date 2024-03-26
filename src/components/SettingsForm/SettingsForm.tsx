import React, { useRef, useState, useEffect } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import Button from "components/Button";
import styles from "./SettingsForm.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { MAX_FILE_SIZE } from "../../consts";

type SettingsFormProps = {
  username?: string;
  email?: string;
  descripton?: string;
  image: string;
};

const SettingsForm: React.FC<SettingsFormProps> = ({
  username,
  email,
  descripton,
  image,
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
    reset({
      username: username,
      email: email,
      description: descripton,
    });
  }, []);

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
      setImageSrc(null); // Очищаем источник изображения
    }
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data.username);
    console.log(data.email);
    console.log(data.description);
    console.log(data.password);
    navigate("/home");
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
          })}
          className={styles["form__input"]}
          placeholder="Имя пользователя*"
          type="text"
        />
        {errors?.username && touchedFields.username && (
          <div className={styles["form__input-message"]}>
            {errors?.titusernamele?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <input
          {...register("email", {
            required: "Обязательное поле",
          })}
          className={styles["form__input"]}
          placeholder="Email*"
          type="text"
        />
        {errors?.email && touchedFields.email && (
          <div className={styles["form__input-message"]}>
            {errors?.email?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <textarea
          {...register("description", {})}
          className={styles["form__textarea"]}
          placeholder="Описание профиля*"
        />
      </div>

      <div className={styles["form__file-block"]}>
        <div className={styles["form__file"]}>
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
                <label htmlFor="input">{<>Измените фото профиля</>}</label>
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
    </form>
  );
};

export default SettingsForm;
