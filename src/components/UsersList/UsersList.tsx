import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./UsersList.module.scss";
import { RecUsersSubscriptions } from "types";
import SubscriptionsIcon from "components/Icons/SubscriptionsIcon";
import FloatingButton from "components/FloatingButton";

type UsersListProps = {
  // isSubscriptions?: boolean;
  activeNavigation?: "subscribers" | "subscriptions" | "";
  users: RecUsersSubscriptions[];
  subscriptionsCount?: number;
  subscribersCount?: number;
  title?: string;
  onFollowClick?: () => void;
  onUserClick?: () => void;
  onMenuClick?: () => void;
  onUnsubscribeClick?: (id: number) => void;
  onSubscribeClick?: (author_id: number) => void;
  actionText?: string;
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  onFollowClick,
  actionText,
  onUserClick,
  activeNavigation,
  subscriptionsCount,
  subscribersCount,
  title,
  onMenuClick,
  onUnsubscribeClick,
  onSubscribeClick,
}) => {
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onClick = (id: number) => {
    onUserClick && onUserClick();
    navigate(`/users/${id}`);
  };

  const handleFollowClick = (index: number, author_id?: number) => {
    if (onSubscribeClick && author_id) {
      onSubscribeClick(author_id);
    } else if (onFollowClick && index !== isButtonVisible) {
      onFollowClick();
      setIsButtonVisible(index);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsButtonVisible(null);
    }
  };

  const handleUnsubscribeClick = (id: number) => {
    if (onUnsubscribeClick) {
      onUnsubscribeClick(id);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.users}>
      <h4 className={styles.users__title}>{title}</h4>
      {onMenuClick && (
        <div className={styles.users__nav}>
          <div
            onClick={onMenuClick}
            className={
              activeNavigation === "subscribers"
                ? clsx(
                    styles["users__nav-item"],
                    styles["users__nav-item-active"]
                  )
                : styles["users__nav-item"]
            }
          >
            {subscribersCount} Подписчики
          </div>
          <div
            onClick={onMenuClick}
            className={
              activeNavigation === "subscriptions"
                ? clsx(
                    styles["users__nav-item"],
                    styles["users__nav-item-active"]
                  )
                : styles["users__nav-item"]
            }
          >
            {subscriptionsCount} Подписки
          </div>
        </div>
      )}
      {users.map((user: RecUsersSubscriptions, index: number) => (
        <div key={user.id} className={styles.users__item}>
          <div
            className={styles["users__item-info"]}
            onClick={() => onClick(user.id)}
          >
            <img
              className={styles["users__item-image"]}
              src={user.profile_picture}
              alt="user"
            />
            <div className={styles["users__item-caption"]}>
              <h4 className={styles["users__item-username"]}>
                {user.username}
              </h4>
              <p className={styles["users__item-rating"]}>
                Рейтинг: {user.rating}
              </p>
            </div>
          </div>
          <span className={styles["users__item-action-wrapper"]}>
            <p
              className={styles["users__item-action"]}
              onClick={() => {
                handleFollowClick(index, user.id);
              }}
              style={
                onFollowClick ? { cursor: "pointer" } : { cursor: "default" }
              }
            >
              {actionText}
            </p>
            {isButtonVisible === index &&
              activeNavigation === "subscriptions" && (
                <FloatingButton
                  onClick={() => {
                    handleUnsubscribeClick(user.id);
                  }}
                  ref={buttonRef}
                >
                  Отписаться
                </FloatingButton>
              )}
          </span>
        </div>
      ))}

      {users.length === 0 && (
        <div className={styles.users__empty}>
          <SubscriptionsIcon />
          {activeNavigation === "subscribers" ? (
            <h4>Пока нет подписчиков</h4>
          ) : (
            activeNavigation === "subscriptions" && <h4>Пока нет подписок</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersList;
