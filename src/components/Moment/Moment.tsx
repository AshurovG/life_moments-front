import React from "react";
import styles from "./Moment.module.scss";
import { MomentData } from "types";
import HeartIcon from "components/Icons/HeartIcon";
import CommentIcon from "components/Icons/CommentIcon";

const Moment: React.FC<{ moment: MomentData }> = ({ moment }) => {
  return (
    <div className={styles.moment}>
      <div className={styles.moment__wrapper}>
        <div className={styles.moment__header}>
          <img
            className={styles["moment__header-logo"]}
            src={moment.author.image}
            alt="user"
          />
          <div className={styles["moment__text"]}>
            <h4 className={styles["moment__username"]}>
              {moment.author.username}
            </h4>
            <p className={styles["moment__header-date"]}>{moment.date}</p>
          </div>
        </div>

        <p className={styles.moment__title}>{moment.title}</p>

        {moment.tags && (
          <div className={styles.moment__tags}>
            {moment.tags.map((tag) => (
              <p>#{tag.title}</p>
            ))}
          </div>
        )}
      </div>

      <img className={styles.moment__image} src={moment.image} alt="" />
      <div className={styles.moment__wrapper}>
        <p className={styles.moment__text}>{moment.text}</p>

        <div className={styles.moment__actions}>
          <HeartIcon width={22} height={22} />
          <CommentIcon width={22} height={22} />
        </div>

        <p className={styles.moment__text}>Нравится: {moment.likes?.length}</p>

        <div className={styles.moment__comments}>
          {moment.comments && (
            <>
              <div className={styles["moment__comments-item"]}>
                <div className={styles["moment__comments-wrapper"]}>
                  <img
                    className={styles["moment__comments-logo"]}
                    src={moment.author.image}
                    alt="user"
                  />
                  <div className={styles["moment__text"]}>
                    <div className={styles["moment__comments-caption"]}>
                      <h4 className={styles["moment__comments-username"]}>
                        {moment.author.username}
                      </h4>
                      <p className={styles["moment__comments-date"]}>
                        {moment.comments[0].date}
                      </p>
                    </div>

                    <p>{moment.comments[0].text}</p>
                    <p className={styles.moment__link}>Нравится: 2</p>
                    <p
                      style={{ cursor: "pointer" }}
                      className={styles.moment__link}
                    >
                      Посмотреть все
                    </p>
                  </div>
                </div>
                <HeartIcon width={22} height={22} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moment;
