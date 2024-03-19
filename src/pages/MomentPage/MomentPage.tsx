import { useRef, useState } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import Button from "components/Button";
import styles from "./MomentPage.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { MAX_FILE_SIZE } from "../../consts";

const MomentPage = () => {
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
    console.log(data.title);
    console.log(data.description);
    console.log(data.password);
    navigate("/home");
  };

  return (
    <div className={styles.moment__page}>
      <div className={styles["moment__page-wrapper"]}>
        <h1 className={styles["moment__page-title"]}>Создание нового поста</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={form}
          className={styles["moment__page-form"]}
        >
          <div style={{ position: "relative", width: `100%` }}>
            <input
              {...register("title", {
                required: "Обязательное поле",
              })}
              className={styles["moment__page-form-input"]}
              placeholder="Название поста*"
              type="text"
            />
            {errors?.title && touchedFields.title && (
              <div className={styles["moment__page-form-input-message"]}>
                {errors?.title?.message?.toString()}
              </div>
            )}
          </div>
          <div style={{ position: "relative", width: `100%` }}>
            <textarea
              {...register("description", {})}
              className={styles["moment__page-form-textarea"]}
              placeholder="Описание*"
            />
          </div>

          <div className={styles["moment__page-form-file-block"]}>
            <div className={styles["moment__page-form-file"]}>
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
                    <label htmlFor="input">{<>Выберите фото</>}</label>
                    {error && (
                      <div className={styles["moment__page-form-file-message"]}>
                        {error.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {imageSrc && <img src={imageSrc} alt="user" />}
          </div>

          <Button
            className={styles["moment__page-form-btn"]}
            disabled={!isValid}
            type="submit"
          >
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MomentPage;
