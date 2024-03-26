import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { mockCurrentUser, mockMoments, mockUsers } from "../../consts";
import Button from "components/Button";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";
import UsersList from "components/UsersList";
import Gallery from "components/Gallery";
import SettingsForm from "components/SettingsForm";

const HomePage: React.FC<{ isAuthUser?: boolean }> = ({ isAuthUser }) => {
  const navigate = useNavigate();
  const [isFollowersOpened, setIsFollowersOpened] = useState(false);
  const [isFollowingsOpened, setIsFollowingsOpened] = useState(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);

  const onNewPostButtonClick = () => {
    navigate("/moment");
  };

  return (
    <div className={styles.home__page}>
      <div className={styles["home__page-wrapper"]}>
        <div className={styles["home__page-header"]}>
          <div className={styles["home__page-profile"]}>
            <img
              className={styles["home__page-image"]}
              src={mockCurrentUser.image}
              alt="user"
            />
            <h4 className={styles["home__page-profile-text"]}>
              {mockCurrentUser.username}
            </h4>
          </div>
          <div className={styles["home__page-info"]}>
            <div className={styles["home__page-info-details"]}>
              <div
                style={{ cursor: "default" }}
                className={styles["home__page-info-item"]}
              >
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.posts.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>публикации</p>
              </div>

              <div
                className={styles["home__page-info-item"]}
                onClick={() => setIsFollowersOpened(true)}
              >
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.followers.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписчики</p>
              </div>

              <div
                className={styles["home__page-info-item"]}
                onClick={() => setIsFollowingsOpened(true)}
              >
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.following.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписки</p>
              </div>
            </div>

            {!isAuthUser ? (
              <div className={styles["home__page-info-actions"]}>
                <Button className={styles["home__page-info-btn"]}>
                  Подписаться
                </Button>
              </div>
            ) : (
              <div className={styles["home__page-info-actions"]}>
                <Button
                  className={styles["home__page-info-btn"]}
                  onClick={() => setIsSettingsOpened(true)}
                >
                  Редактировать
                </Button>
                <Button
                  onClick={onNewPostButtonClick}
                  className={styles["home__page-info-btn"]}
                >
                  Новая публикация
                </Button>
              </div>
            )}
          </div>
        </div>

        <p className={styles["home__page-description"]}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          consequatur maiores vero vel quasi ipsam atque asperiores repellat
          aspernatur tenetur!
        </p>

        <Gallery
          moments={mockCurrentUser.posts}
          // onMomentClick={() => setIsPostOpened(true)}
          className={styles["home__page-gallery"]}
        />
      </div>

      <ModalWindow
        active={isFollowersOpened}
        handleBackdropClick={() => setIsFollowersOpened(false)}
        className={styles["home__page-modal-users"]}
      >
        <UsersList
          users={mockUsers}
          actionText="Подписан на вас"
          onUserClick={() => setIsFollowersOpened(false)}
        />
        {/* TODO: сюда прокидывать самих пользователей, а не айди */}
      </ModalWindow>

      <ModalWindow
        active={isFollowingsOpened}
        handleBackdropClick={() => setIsFollowingsOpened(false)}
        className={styles["home__page-modal-users"]}
      >
        <UsersList
          users={mockUsers}
          onFollowClick={() => {}}
          actionText="Вы подписаны"
          onUserClick={() => setIsFollowingsOpened(false)}
        />
        {/* TODO: сюда прокидывать самих пользователей, а не айди */}
      </ModalWindow>

      <ModalWindow
        active={isSettingsOpened}
        handleBackdropClick={() => setIsSettingsOpened(false)}
        className={styles["home__page-modal-settings"]}
      >
        <h4 className={styles["home__page-modal-title"]}>Настройки профиля</h4>
        <SettingsForm
          username={mockCurrentUser.username}
          email={mockCurrentUser.email}
          descripton="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi consequatur maiores vero vel quasi ipsam atque asperiores repellat aspernatur tenetur!"
          image={mockCurrentUser.image}
        />
      </ModalWindow>
    </div>
  );
};

export default HomePage;
