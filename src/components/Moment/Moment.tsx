import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useUserInfo } from "slices/UserSlice";
import styles from "./Moment.module.scss";
import { MomentData, RecMomentsData } from "types";
import HeartIcon from "components/Icons/HeartIcon";
import CommentIcon from "components/Icons/CommentIcon";
import IconButton from "components/IconButton";
import ArrowIcon from "components/Icons/ArrowIcon";
import Input from "components/Input";

type MomentProps = {
  // moment: MomentData;
  moment: RecMomentsData;
  isModal?: boolean;
  isModalOpened?: boolean;
  className?: string;
  onUserClick?: () => void;
  onLikeClick: (moment_id?: number, comment_id?: number) => void;
  commentValue?: string;
  onCommentValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendCommentClick: (moment_id: number) => void;
  onLikeListClick: (moment_id: number) => void;
  onCommentLikeListClick: (comment_id: number) => void;
};

const Moment: React.FC<MomentProps> = ({
  moment,
  isModal,
  isModalOpened,
  commentValue,
  onUserClick,
  onLikeClick,
  onCommentValueChange,
  onSendCommentClick,
  onLikeListClick,
  onCommentLikeListClick,
  className,
}) => {
  const userInfo = useUserInfo();
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
          <Link onClick={onUserClick} to={`/users/${moment.author?.id}`}>
            <img
              className={styles["moment__header-logo"]}
              src={moment.author?.profile_picture}
              alt="user"
            />
          </Link>
          <div className={styles["moment__text"]}>
            <Link onClick={onUserClick} to={`/users/${moment.author?.id}`}>
              <h4 className={styles["moment__username"]}>
                {moment.author?.username}
              </h4>
            </Link>
            <p className={styles["moment__header-date"]}>
              {/* {moment.publication_date.toLocaleDateString()} */}
              {moment.publication_date}
            </p>
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
        <p className={styles.moment__text}>{moment.description}</p>

        <div className={styles.moment__actions}>
          <HeartIcon
            onClick={() => onLikeClick(moment.id)}
            width={22}
            height={22}
            flag={moment.likes?.some(
              (like) => like.id_author === userInfo?.user_id
            )}
          />
          <CommentIcon width={22} height={22} />
        </div>

        <p
          onClick={() => onLikeListClick(moment.id)}
          className={styles.moment__action}
        >
          Нравится: {moment.likes?.length}
        </p>

        <div className={styles["moment__comments"]}>
          <div className={styles["moment__comments-input"]}>
            <Input
              value={commentValue}
              onChange={onCommentValueChange}
              placeholder="Отправьте комментарий*"
            ></Input>
            <IconButton onClick={() => onSendCommentClick(moment.id)}>
              <ArrowIcon />
            </IconButton>
          </div>
          {moment.comments?.length !== 0 && moment.comments && (
            <>
              <div className={styles["moment__comments-item"]}>
                <div className={styles["moment__comments-wrapper"]}>
                  <Link
                    onClick={onUserClick}
                    to={`/users/${moment.comments[0].author.id}`}
                  >
                    <img
                      className={styles["moment__comments-logo"]}
                      src={moment.comments[0].author.profile_picture}
                      alt="user"
                    />
                  </Link>
                  <div className={styles["moment__text"]}>
                    <div className={styles["moment__comments-caption"]}>
                      <Link
                        onClick={onUserClick}
                        to={`/users/${moment.comments[0].author.id}`}
                      >
                        <h4 className={styles["moment__comments-username"]}>
                          {moment.comments[0].author.username}
                        </h4>
                      </Link>
                      <p className={styles["moment__comments-date"]}>
                        {/* {moment.comments[0].publication_date.toLocaleDateString()} */}
                        {moment.comments[0].publication_date}
                      </p>
                    </div>

                    <p>{moment.comments[0].text}</p>
                    <p
                      onClick={() =>
                        moment.comments &&
                        onCommentLikeListClick(moment.comments[0].id)
                      }
                      className={styles.moment__link}
                    >
                      Нравится: {moment.comments[0].likes.length}
                    </p>
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
                <HeartIcon
                  onClick={() => {
                    if (moment.comments) {
                      onLikeClick(undefined, moment.comments[0].id);
                    }
                  }}
                  flag={moment.comments[0].likes.some(
                    (like) => like === userInfo?.user_id
                  )}
                  width={22}
                  height={22}
                />
              </div>

              {isAllCommentsVisible &&
                moment.comments.length &&
                moment.comments.slice(1).map((comment, index) => (
                  <div className={styles["moment__comments-item"]}>
                    <div className={styles["moment__comments-wrapper"]}>
                      <Link
                        onClick={onUserClick}
                        to={`/users/${comment.author.id}`}
                      >
                        <img
                          className={styles["moment__comments-logo"]}
                          src={comment.author.profile_picture}
                          alt="user"
                        />
                      </Link>

                      <div className={styles["moment__text"]}>
                        <div className={styles["moment__comments-caption"]}>
                          <Link
                            onClick={onUserClick}
                            to={`/users/${comment.author.id}`}
                          >
                            <h4 className={styles["moment__comments-username"]}>
                              {comment.author.username}
                            </h4>
                          </Link>
                          <p className={styles["moment__comments-date"]}>
                            {/* {comment.publication_date.toLocaleDateString()} */}
                            {comment.publication_date}
                          </p>
                        </div>
                        <p>{comment.text}</p>
                        <p
                          onClick={() =>
                            moment.comments &&
                            onCommentLikeListClick(comment.id)
                          }
                          className={styles.moment__link}
                        >
                          Нравится: {comment.likes.length}
                        </p>
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
                    <HeartIcon
                      onClick={() => {
                        if (moment.comments) {
                          onLikeClick(undefined, comment.id);
                        }
                      }}
                      flag={comment.likes.some(
                        (like) => like === userInfo?.user_id
                      )}
                      width={22}
                      height={22}
                    />
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
