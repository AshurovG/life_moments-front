import React from "react";
import styles from "./EventsFeedPage.module.scss";
import Moment from "components/Moment";
import UsersList from "components/UsersList";
import { MomentData } from "../../types";
import { mockMoments } from "../../consts";
import { mockUsers } from "../../consts";

const EventsFeedPage = () => {
  return (
    <div className={styles.events__page}>
      <div className={styles["events__page-wrapper"]}>
        <div className={styles["events__page-moments"]}>
          {mockMoments.map((moment: MomentData) => (
            <Moment moment={moment} />
          ))}
        </div>
        <div className={styles["events__page-actions"]}>
          <h4 className={styles["events__page-title"]}>Рекомендации для вас</h4>
          <UsersList users={mockUsers} actionText="Подписаться" />
        </div>
      </div>
    </div>
  );
};

export default EventsFeedPage;
