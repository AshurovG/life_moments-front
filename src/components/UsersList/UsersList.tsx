import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./UsersList.module.scss";
import { UserData, RecUsersSubscriptions } from "types";

type UsersListProps = {
  // isSubscriptions?: boolean;
  activeNavigation?: "subscribers" | "subscriptions" | "";
  users: RecUsersSubscriptions[];
  subscriptionsCount?: number;
  subscribersCount?: number;
  onFollowClick?: () => void;
  onUserClick?: () => void;
  onMenuClick?: () => void;
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
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`/users/${id}`);
    onUserClick && onUserClick();
  };

  return (
    <div className={styles.users}>
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
      {users.map((user: RecUsersSubscriptions) => (
        <div className={styles.users__item}>
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
          <p
            className={styles["users__item-action"]}
            onClick={onFollowClick}
            style={
              onFollowClick ? { cursor: "pointer" } : { cursor: "default" }
            }
          >
            {actionText}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
