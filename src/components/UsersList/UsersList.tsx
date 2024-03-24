import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UsersList.module.scss";
import { UserData } from "types";

type UsersListProps = {
  users: UserData[];
  onFollowClick?: () => void;
  onUserClick?: () => void;
  actionText?: string;
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  onFollowClick,
  actionText,
  onUserClick,
}) => {
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`/users/${id}`);
    onUserClick && onUserClick();
  };

  return (
    <div className={styles.users}>
      {users.map((user: UserData) => (
        <div className={styles.users__item}>
          <div
            className={styles["users__item-info"]}
            onClick={() => onClick(user.id)}
          >
            <img
              className={styles["users__item-image"]}
              src={user.image}
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
