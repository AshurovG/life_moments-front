import React, { useState } from "react";
import clsx from "clsx";
import Input from "components/Input";
import styles from "./Moment.module.scss";
import { MomentData } from "types";
import HeartIcon from "components/Icons/HeartIcon";
import CommentIcon from "components/Icons/CommentIcon";
import IconButton from "components/IconButton";
import ArrowIcon from "components/Icons/ArrowIcon";

type MomentProps = {
  isModal?: boolean;
  moment: MomentData;
  className?: string;
};

const Moment: React.FC<MomentProps> = ({ moment, isModal, className }) => {
  const [isAllCommentsVisible, setIsAllCommentsVisible] = useState(false);

  return (
    <div
      className={clsx(styles.moment, className)}
      style={!isModal ? { border: "1px solid #e9e9e9", borderRadius: 5 } : {}}
    >
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

        <div>
          <div className={styles["moment__comments-input"]}>
            <Input></Input>
            <IconButton>
              <ArrowIcon />
            </IconButton>
          </div>
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
                        {moment.comments[0].author.username}
                      </h4>
                      <p className={styles["moment__comments-date"]}>
                        {moment.comments[0].date}
                      </p>
                    </div>

                    <p>{moment.comments[0].text}</p>
                    <p className={styles.moment__link}>Нравится: 2</p>
                    {!isAllCommentsVisible && moment.comments.length > 1 && (
                      <p
                        style={{ cursor: "pointer" }}
                        className={styles.moment__link}
                        onClick={() => setIsAllCommentsVisible(true)}
                      >
                        Посмотреть все
                      </p>
                    )}
                  </div>
                </div>
                <HeartIcon width={22} height={22} />
              </div>

              {isAllCommentsVisible &&
                moment.comments.slice(1).map((comment, index) => (
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
                            {comment.author.username}
                          </h4>
                          <p className={styles["moment__comments-date"]}>
                            {comment.date}
                          </p>
                        </div>

                        <p className={styles.moment__link}>Нравится: 2</p>
                        {index + 2 == moment.comments?.length && (
                          <p
                            style={{ cursor: "pointer" }}
                            className={styles.moment__link}
                            onClick={() => setIsAllCommentsVisible(false)}
                          >
                            Скрыть
                          </p>
                        )}
                        <div></div>
                      </div>
                    </div>
                    <HeartIcon width={22} height={22} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moment;
