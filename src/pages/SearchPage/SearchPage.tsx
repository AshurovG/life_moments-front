import { useState } from "react";
import styles from "./SearchPage.module.scss";
import Input from "components/Input";
import SearchIcon from "components/Icons/SearchIcon";
import IconButton from "components/IconButton";
import Gallery from "components/Gallery";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";
import { mockMoments } from "../../consts";

const SearchPage = () => {
  const [isPostOpened, setIsPostOpened] = useState(false);

  return (
    <div className={styles.search__page}>
      <div className={styles["search__page-wrapper"]}>
        <div className={styles["search__page-action"]}>
          <Input placeholder="Поиск пользователей / публикаций*" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
        <Gallery
          moments={mockMoments}
          onMomentClick={() => setIsPostOpened(true)}
        />
      </div>
      <ModalWindow
        active={isPostOpened}
        handleBackdropClick={() => setIsPostOpened(false)}
        className={styles["search__page-modal"]}
      >
        <Moment
          className={styles["search__page-moment"]}
          moment={mockMoments[0]}
          isModal
        />
        {/* TODO: сюда прокидывать ID поста для последующего выполнения запроса */}
      </ModalWindow>
    </div>
  );
};

export default SearchPage;
