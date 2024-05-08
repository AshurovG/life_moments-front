import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserInfoAction, useUserInfo } from "slices/UserSlice";
import styles from "./HomePage.module.scss";
import { SettingsData } from "../../types";
import { mockCurrentUser, mockMoments, mockUsers } from "../../consts";
import Button from "components/Button";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";
import UsersList from "components/UsersList";
import Gallery from "components/Gallery";
import SettingsForm from "components/SettingsForm";
import { toast } from "react-toastify";

const HomePage: React.FC<{ isAuthUser?: boolean }> = ({ isAuthUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const [isFollowersOpened, setIsFollowersOpened] = useState(false);
  const [isFollowingsOpened, setIsFollowingsOpened] = useState(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);

  const onNewPostButtonClick = () => {
    navigate("/moment");
  };

  const logout = async () => {
    try {
      await axios("http://localhost:8000/api/user/logout", {
        method: "POST",
        withCredentials: true,
      });
      Cookies.remove("session_id");
      dispatch(setUserInfoAction(null));
      toast.success("Выход выполнен успешно!");
    } catch (error) {
      throw error;
    } finally {
    }
  };

  const updateSettings = async (data: SettingsData) => {
    if (!Object.keys(data).length) {
      toast.error("Вы ничего не изменили");
      return;
    }

    const formData = new FormData();

    console.log(data);

    if (data.username) {
      formData.append("username", data.username);
    }

    if (data.email) {
      formData.append("email", data.email);
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }

    try {
      await axios("http://localhost:8000/api/user/update", {
        method: "PUT",
        withCredentials: true,
        data: formData,
      });
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      // navigate("/login");
      setIsSettingsOpened(false);
      document.body.style.overflow = "auto"; // TODO подумать как изменить
    } catch (error) {
      throw error;
    }
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
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi consequatur maiores vero vel quasi ipsam atque asperiores repellat aspernatur tenetur!"
          image={mockCurrentUser.image}
          active={isSettingsOpened}
          handleLogoutClick={handleLogoutClick}
          handleSaveClick={updateSettings}
        />
      </ModalWindow>
    </div>
  );
};

export default HomePage;
