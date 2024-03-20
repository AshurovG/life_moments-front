import React from "react";
import styles from "./EventsList.module.scss";
import clsx from "clsx";
import { LikeData, SubscriptionData } from "types";
import Button from "components/Button";

type EventsProps = {
  className?: string;
  subscriptions: SubscriptionData[];
  likes: LikeData[];
};

const EventsList: React.FC<EventsProps> = ({
  className,
  subscriptions,
  likes,
}) => {
  return (
    <div className={clsx(styles.events, className)}>
      {likes.map((like) => (
        <div className={styles.events__item}>
          {/* <div className={styles["events__item-wrapper"]}> */}
          <div className={styles["events__item-content"]}>
            <img
              className={styles["events__item-profile"]}
              src={like.author.image}
              alt="follower"
            />
            <p className={styles["events__item-text"]}>
              <b>{like.author.username}</b>
              <br />
              {/* Подписался(-ась) на вас. {subscription.date} */}
              Оценил(-а) вашу публикацию 1д.
            </p>
            {/* </div> */}
          </div>
          {like.moment && (
            <img
              className={styles["events__item-image"]}
              src={like.moment.image}
              alt="moment"
            />
          )}
        </div>
      ))}
      {subscriptions.map((subscription) => (
        <div className={styles.events__item}>
          {/* <div className={styles["events__item-wrapper"]}> */}
          <div className={styles["events__item-content"]}>
            <img
              className={styles["events__item-profile"]}
              src={subscription.follower.image}
              alt="follower"
            />
            <p className={styles["events__item-text"]}>
              <b>{subscription.follower.username}</b>
              <br />
              {/* Подписался(-ась) на вас. {subscription.date} */}
              Подписался(-ась) на вас 3д.
            </p>
            {/* </div> */}
          </div>
          <Button className={styles["events__item-btn"]}>Подписаться</Button>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
