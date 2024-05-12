import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserInfoAction, useUserInfo } from "slices/UserSlice";
import { toast } from "react-toastify";
import styles from "./HomePage.module.scss";
import {
  SettingsData,
  RecMomentsData,
  RecSubscriptionsData,
  RecUsersSubscriptions,
} from "../../types";
import Button from "components/Button";
import ModalWindow from "components/ModalWindow";
import UsersList from "components/UsersList";
import Gallery from "components/Gallery";
import SettingsForm from "components/SettingsForm";
import CameraIcon from "components/Icons/CameraIcon";

const HomePage: React.FC<{ isAuthUser?: boolean }> = ({ isAuthUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const [activeNavigation, setActiveNavigation] = useState<
    "subscribers" | "subscriptions" | ""
  >("");
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const [moments, setMoments] = useState<RecMomentsData[]>([]);
  const [subscribers, setSubscribers] = useState<RecSubscriptionsData[]>([]);
  const [subscriptions, setSubscriptions] = useState<RecSubscriptionsData[]>(
    []
  );
  const [users, setUsers] = useState<RecUsersSubscriptions[]>([]);
  const [isUserListOpened, setIsUserListOpened] = useState(false);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<RecUsersSubscriptions>();

  const onNewPostButtonClick = () => {
    navigate("/moment");
  };

  const check = async () => {
    try {
      const response = await axios("http://localhost:8000/api/user/info", {
        method: "GET",
        withCredentials: true,
      });
      dispatch(setUserInfoAction(response.data));
      setIsUserInfoLoading(false);
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  };

  const getDetailedUserInfo = async (id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/user/detailed?id=${id}`,
        {
          withCredentials: true,
        }
      );

      setMoments(response.data.moments);
      setSubscribers(response.data.subscribers);
      setSubscriptions(response.data.subscriptions);
      setCurrentUser(response.data.user);

      console.log(response);
    } catch (error) {
      throw error;
    }
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
      toast.success("Настройки обновлены!");
    } catch (error) {
      toast.error("Что-то пошло не так...");
    } finally {
      check();
    }
  };

  const getSubscribers = async () => {
    try {
      const response = await axios(
        `http://localhost:8000/api/user/subscribers?id=${currentUser?.id}`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error) {
      throw error;
    }
  };

  const getSubscriptions = async () => {
    try {
      const response = await axios(
        `http://localhost:8000/api/user/subscriptions?id=${currentUser?.id}`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error) {
      throw error;
    }
  };

  const subscribe = async () => {
    try {
      await axios(
        `http://localhost:8000/api/user/subscribe?author_id=${currentUser?.id}&subscriber_id=${userInfo?.user_id}`,
        {
          method: "POST",
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error("Что-то пошло не так...");
      throw error;
    }
  };

  const unsubscribe = async (id: number) => {
    try {
      await axios(`http://localhost:8000/api/user/unsubscribe?id=${id}`, {
        method: "DELETE",
        withCredentials: true,
      });
    } catch (error) {
      toast.error("Что-то пошло не так...");
      throw error;
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      setIsSettingsOpened(false);
      document.body.style.overflow = "auto"; // TODO подумать как изменить
    } catch (error) {
      throw error;
    }
  };

  const handleSubscribersClick = () => {
    getSubscribers();
    setActiveNavigation("subscribers");
    setIsUserListOpened(true);
  };

  const handleSubscriptionsClick = () => {
    getSubscriptions();
    setActiveNavigation("subscriptions");
    setIsUserListOpened(true);
  };

  const handleSaveSettingsClick = (data: SettingsData) => {
    updateSettings(data);
    setIsSettingsOpened(false);
  };

  const handleNavigationSelect = () => {
    console.log("handler");
    if (activeNavigation === "subscribers") {
      getSubscriptions();
      setActiveNavigation("subscriptions");
    } else {
      getSubscribers();

      setActiveNavigation("subscribers");
    }
  };

  const handleSubscribeClick = async () => {
    // Проверка наличия подписки на данного пользователя
    if (
      !subscribers?.some(
        (subscription) => subscription.id_subscriber === userInfo?.user_id
      )
    ) {
      await subscribe();
    } else {
      const deletedSubscription = subscribers.find((subscription) => {
        return subscription.id_subscriber === userInfo?.user_id;
      });
      if (deletedSubscription) {
        await unsubscribe(deletedSubscription?.id);
      }
    }

    if (currentUser) {
      getDetailedUserInfo(currentUser?.id);
    }
  };

  useEffect(() => {
    //Проверяем, открыта домашняя страница или нет
    console.log("effect");
    if (id) {
      getDetailedUserInfo(Number(id));
    } else {
      userInfo && getDetailedUserInfo(userInfo?.user_id);
    }
  }, [id]);

  // useEffect(() => {
  //   console.log(id);
  //   // check();
  // }, []);

  return (
    <div className={styles.home__page}>
      <div className={styles["home__page-wrapper"]}>
        <div className={styles["home__page-header"]}>
          <div className={styles["home__page-profile"]}>
            <img
              className={styles["home__page-image"]}
              // src={userInfo?.profile_picture}
              src={currentUser?.profile_picture}
              alt="user"
            />
            <h4 className={styles["home__page-profile-text"]}>
              {currentUser?.username}
              {/* {userInfo?.username} */}
            </h4>
          </div>
          <div className={styles["home__page-info"]}>
            <div className={styles["home__page-info-details"]}>
              <div
                style={{ cursor: "default" }}
                className={styles["home__page-info-item"]}
              >
                <p className={styles["home__page-info-title"]}>
                  {/* {mockCurrentUser.posts.length} */}
                  {moments.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>публикации</p>
              </div>

              <div
                className={styles["home__page-info-item"]}
                onClick={handleSubscribersClick}
              >
                <p className={styles["home__page-info-title"]}>
                  {/* {mockCurrentUser.followers.length} */}
                  {subscribers.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписчики</p>
              </div>

              <div
                className={styles["home__page-info-item"]}
                onClick={handleSubscriptionsClick}
              >
                <p className={styles["home__page-info-title"]}>
                  {/* {mockCurrentUser.following.length} */}
                  {subscriptions.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписки</p>
              </div>
            </div>

            {userInfo?.user_id !== currentUser?.id ? (
              <div className={styles["home__page-info-actions"]}>
                <Button
                  onClick={handleSubscribeClick}
                  className={styles["home__page-info-btn"]}
                >
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
          {currentUser?.description}
        </p>

        <Gallery moments={moments} className={styles["home__page-gallery"]} />

        {moments.length === 0 && (
          <div className={styles["home__page-empty"]}>
            <CameraIcon />
            <h3>Пока нет публикаций</h3>
          </div>
        )}
      </div>

      <ModalWindow
        active={isUserListOpened}
        handleBackdropClick={() => {
          setActiveNavigation("");
          setIsUserListOpened(false);
        }}
        className={styles["home__page-modal-users"]}
      >
        {activeNavigation === "subscribers" ? (
          <UsersList
            users={users}
            actionText="Подписан на вас"
            onUserClick={() => {
              setActiveNavigation("");
              setIsUserListOpened(false);
            }}
            activeNavigation={activeNavigation}
            subscribersCount={subscribers.length}
            subscriptionsCount={subscriptions.length}
            onMenuClick={handleNavigationSelect}
          />
        ) : (
          activeNavigation === "subscriptions" && (
            <UsersList
              users={users}
              onFollowClick={() => {}}
              actionText="Вы подписаны"
              onUserClick={() => {
                setActiveNavigation("");
                setIsUserListOpened(false);
              }}
              activeNavigation={activeNavigation}
              subscribersCount={subscribers.length}
              subscriptionsCount={subscriptions.length}
              onMenuClick={handleNavigationSelect}
            />
          )
        )}
      </ModalWindow>

      <ModalWindow
        active={isSettingsOpened}
        handleBackdropClick={() => setIsSettingsOpened(false)}
        className={styles["home__page-modal-settings"]}
      >
        <h4 className={styles["home__page-modal-title"]}>Настройки профиля</h4>
        <SettingsForm
          active={isSettingsOpened}
          handleLogoutClick={handleLogoutClick}
          handleSaveClick={handleSaveSettingsClick}
        />
      </ModalWindow>
    </div>
  );
};

export default HomePage;
