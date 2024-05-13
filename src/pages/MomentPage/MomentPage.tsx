import { useRef, useState } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link, Form } from "react-router-dom";
import styles from "./MomentPage.module.scss";
import { CreatedMomentData } from "types";
import Button from "components/Button";
import { MAX_FILE_SIZE } from "../../consts";
import BackIcon from "components/Icons/BackIcon";
import { toast } from "react-toastify";

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
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // const createMoment = async (data: CreatedMomentData) => {
  //   console.log(data);
  //   const formData = new FormData();
  //   formData.append("title", data.title);
  //   if (data.description) {
  //     formData.append("description", data.description);
  //   }
  //   formData.append("image", data.image);
  //   formData.append("tags", tags);

  //   try {
  //     await axios("http://localhost:8000/api/moments/create", {
  //       method: "POST",
  //       data: formData,
  //       withCredentials: true,
  //     });
  //     navigate("/home");
  //     toast.success("Пост успешно опубликован!");
  //   } catch (error) {
  //     toast.error("Что-то пошло не так...");
  //   }
  // };

  const createMoment = async (data: CreatedMomentData) => {
    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("image", data.image); // Предполагается, что data.image - это File или Blob
    formData.append("tags", JSON.stringify(tags)); // Преобразуем массив тегов в строку JSON

    try {
      await axios.post("http://localhost:8000/api/moments/create", formData, {
        withCredentials: true,
      });
      navigate("/home");
      toast.success("Пост успешно опубликован!");
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

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
    console.log(data.title);
    console.log(data.description);
    if (selectedFile) {
      createMoment({
        title: data.title,
        description: data.description,
        image: selectedFile,
      });
    }
  };

  const handleTagValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTagValue(value);

    if (value.length > 30) {
      setError("tag", {
        type: "maxLength",
        message: "Тег не должен превышать 30 символов",
      });
    } else if (!value.startsWith("#")) {
      setError("tag", {
        type: "startsWith",
        message: "Тег должен начинаться с символа #",
      });
    } else if (value.length < 3) {
      setError("tag", {
        type: "minLength",
        message: "Тег должен превышать 3 символов",
      });
    } else {
      clearErrors("tag");
    }
  };

  const handleAddTagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTags([...tags, tagValue]);
    setTagValue("");
  };

  const handleClearTagsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTags([]);
  };

  return (
    <div className={styles.moment__page}>
      <div className={styles["moment__page-wrapper"]}>
        <BackIcon onClick={() => navigate("/home")}></BackIcon>
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
                maxLength: {
                  value: 100,
                  message: "Название не должно превышать 100 символов",
                },
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
              {...register("description", {
                maxLength: {
                  value: 300,
                  message: "Описание не должно превышать 300 символов",
                },
              })}
              className={styles["moment__page-form-textarea"]}
              placeholder="Описание*"
            />
            {errors?.description && touchedFields.description && (
              <div className={styles["moment__page-form-input-message"]}>
                {errors?.description?.message?.toString()}
              </div>
            )}
          </div>

          <div
            style={{
              position: "relative",
              width: `100%`,
              whiteSpace: "pre-wrap",
            }}
          >
            <div className={styles["moment__page-form-tags"]}>
              <input
                {...register("tag")}
                className={styles["moment__page-form-input"]}
                placeholder="Тег*"
                type="text"
                value={tagValue}
                onChange={handleTagValueChange}
              />
              <div className={styles["moment__page-form-tags-btns"]}>
                <Button
                  disabled={
                    !tagValue ||
                    errors.tag?.type === "maxLength" ||
                    errors.tag?.type === "startsWith" ||
                    errors.tag?.type === "minLength"
                  }
                  onClick={handleAddTagClick}
                >
                  Добавить
                </Button>
                <Button
                  disabled={tags.length === 0}
                  onClick={handleClearTagsClick}
                >
                  Удалить
                </Button>
              </div>
            </div>
            <p className={styles["moment__page-form-tags-text"]}>
              {tags.join(", ")}
            </p>

            {errors?.tag && touchedFields.tag && (
              <div className={styles["moment__page-form-input-message"]}>
                {errors?.tag?.message?.toString()}
              </div>
            )}
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
                      accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/avif"
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
