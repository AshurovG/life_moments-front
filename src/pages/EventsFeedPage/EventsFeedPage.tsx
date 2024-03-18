import React from "react";
import styles from "./EventsFeedPage.module.scss";
import Moment from "components/Moment";
import { MomentData } from "../../types";
import { mockMoments } from "../../consts";

const EventsFeedPage = () => {
  return (
    <div className={styles.events__page}>
      <div className={styles["events__page-wrapper"]}>
        <div className={styles["events__page-moments"]}>
          {mockMoments.map((moment: MomentData) => (
            <Moment moment={moment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsFeedPage;
