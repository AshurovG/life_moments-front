import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Input from "components/Input";
import styles from "./Moment.module.scss";
import { MomentData } from "types";
import HeartIcon from "components/Icons/HeartIcon";
import CommentIcon from "components/Icons/CommentIcon";
import IconButton from "components/IconButton";
import ArrowIcon from "components/Icons/ArrowIcon";
import { Link } from "react-router-dom";

type MomentProps = {
  moment: MomentData;
  isModal?: boolean;
  isModalOpened?: boolean;
  className?: string;
};

const Moment: React.FC<MomentProps> = ({
  moment,
  isModal,
  isModalOpened,
  className,
}) => {
  const [isAllCommentsVisible, setIsAllCommentsVisible] = useState(false);

  useEffect(() => {
    if (isModalOpened) {
      setIsAllCommentsVisible(false);
    }
  }, [isModalOpened]);

  return (
    <div
      className={clsx(styles.moment, className)}
      style={!isModal ? { border: "1px solid #e9e9e9", borderRadius: 5 } : {}}
    >
      <div className={styles.moment__wrapper}>
        <div className={styles.moment__header}>
          <Link to={`/users/${moment.author.id}`}>
            <img
              className={styles["moment__header-logo"]}
              src={moment.author.image}
              alt="user"
            />
          </Link>
          <div className={styles["moment__text"]}>
            <Link to={`/users/${moment.author.id}`}>
              <h4 className={styles["moment__username"]}>
                {moment.author.username}
              </h4>
            </Link>
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

        <div className={styles["moment__comments"]}>
          <div className={styles["moment__comments-input"]}>
            <Input placeholder="Отправьте комментарий*"></Input>
            <IconButton>
              <ArrowIcon />
            </IconButton>
          </div>
          {moment.comments && (
            <>
              <div className={styles["moment__comments-item"]}>
                <div className={styles["moment__comments-wrapper"]}>
                  <Link to={`/users/${moment.comments[0].author.id}`}>
                    <img
                      className={styles["moment__comments-logo"]}
                      src={moment.author.image}
                      alt="user"
                    />
                  </Link>
                  <div className={styles["moment__text"]}>
                    <div className={styles["moment__comments-caption"]}>
                      <Link to={`/users/${moment.comments[0].author.id}`}>
                        <h4 className={styles["moment__comments-username"]}>
                          {moment.comments[0].author.username}
                        </h4>
                      </Link>
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
                      <Link to={`/users/${comment.author.id}`}>
                        <img
                          className={styles["moment__comments-logo"]}
                          src={moment.author.image}
                          alt="user"
                        />
                      </Link>

                      <div className={styles["moment__text"]}>
                        <div className={styles["moment__comments-caption"]}>
                          <Link to={`/users/${comment.author.id}`}>
                            <h4 className={styles["moment__comments-username"]}>
                              {comment.author.username}
                            </h4>
                          </Link>
                          <p className={styles["moment__comments-date"]}>
                            {comment.date}
                          </p>
                        </div>
                        <p>{comment.text}</p>
                        <p className={styles.moment__link}>Нравится: 1</p>
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
