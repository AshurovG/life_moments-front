import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserInfo } from "slices/UserSlice";
import styles from "./EventsFeedPage.module.scss";
import Moment from "components/Moment";
import UsersList from "components/UsersList";
import { RecMomentsData, RecUsersSubscriptions } from "../../types";
import { mockUsers } from "../../consts";
import BackIcon from "components/Icons/BackIcon";
import ModalWindow from "components/ModalWindow";
import InfiniteScroll from "react-infinite-scroll-component";

const EventsFeedPage = () => {
  const userInfo = useUserInfo();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [moments, setMoments] = useState<RecMomentsData[]>([]);
  const [commentValue, setCommentValue] = useState("");
  const [ratedUsers, setRatedUsers] = useState<RecUsersSubscriptions[]>([]);
  const [isUserListOpened, setIsUserListOpened] = useState(false);

  const getMoments = async (receivedOffset?: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments?offset=${
          receivedOffset !== undefined ? receivedOffset : offset
        }&limit=5`,
        {
          withCredentials: true,
        }
      );

      setMoments((prevMoments) => [...prevMoments, ...response.data]);
      setOffset(offset + 5); // Увеличиваем offset на количество добавленных моментов

      // Проверяем, есть ли еще моменты для загрузки
      if (response.data.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const getDetailedMoment = async (id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments/detailed?id=${id}`,
        {
          withCredentials: true,
        }
      );

      let momentData = {
        ...response.data.moment,
      };

      setMoments((prevMoments) =>
        prevMoments.map((moment: RecMomentsData) => {
          return moment.id === id ? momentData : moment;
        })
      );

      console.log(momentData);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    console.log(moments);
  }, [moments]);

  const makeLike = async (
    moment_id: number | undefined,
    comment_id: number | undefined
  ) => {
    let params = `author_id=${userInfo?.user_id}`;
    if (moment_id) {
      params += `&moment_id=${moment_id}`;
    } else if (comment_id) {
      params += `&comment_id=${comment_id}`;
    }
    try {
      await axios(`http://localhost:8000/api/moments/like?${params}`, {
        method: "POST",
        withCredentials: true,
      });
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const removeLike = async (
    moment_id: number | undefined,
    comment_id: number | undefined
  ) => {
    let params = `author_id=${userInfo?.user_id}`;
    if (moment_id) {
      params += `&moment_id=${moment_id}`;
    } else if (comment_id) {
      params += `&comment_id=${comment_id}`;
    }
    try {
      await axios(`http://localhost:8000/api/moments/remove_like?${params}`, {
        method: "DELETE",
        withCredentials: true,
      });
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const leaveComment = async (moment_id: number) => {
    try {
      await axios(
        `http://localhost:8000/api/moments/comment?author_id=${userInfo?.user_id}&moment_id=${moment_id}`,
        {
          method: "POST",
          data: {
            text: commentValue,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const getLikes = async (moment_id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments/likes?id=${moment_id}`,
        {
          withCredentials: true,
        }
      );

      setRatedUsers(response.data);
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const handleLikeClick = async (
    moment_id: number | undefined,
    comment_id: number | undefined
  ) => {
    const currentMoment = moments.find((item) => {
      return item.id === moment_id;
    });
    console.log(currentMoment);

    if (!comment_id) {
      if (
        currentMoment?.likes?.some(
          (like) => like === userInfo?.user_id // Проверка наличия лайка
        )
      ) {
        await removeLike(moment_id, undefined);
      } else {
        await makeLike(moment_id, undefined);
      }
    } else if (comment_id) {
      const currentComment = currentMoment?.comments?.find((comment) => {
        return comment.id === comment_id;
      });
      if (
        currentComment?.likes?.some(
          (like) => like === userInfo?.user_id // Проверка наличия лайка
        )
      ) {
        await removeLike(undefined, comment_id);
      } else {
        await makeLike(undefined, comment_id);
      }
    }
    if (currentMoment && moment_id) {
      getDetailedMoment(moment_id);
    }
  };

  const handleCommentValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentValue(event.target.value);
  };

  const handleSendCommentClick = async (moment_id: number) => {
    if (commentValue) {
      await leaveComment(moment_id);
      getDetailedMoment(moment_id);
    }
    setCommentValue("");
  };

  const handleLikesClick = async (moment_id: number) => {
    await getLikes(moment_id);
    setIsUserListOpened(true);
  };

  useEffect(() => {
    getMoments();
  }, []);

  return (
    <div className={styles.events__page}>
      <div className={styles["events__page-wrapper"]}>
        <div className={styles["events__page-moments"]}>
          <InfiniteScroll
            dataLength={moments.length}
            next={getMoments}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {moments.map((moment: RecMomentsData) => (
              <div>
                <Moment
                  moment={moment}
                  onLikeClick={handleLikeClick}
                  onCommentValueChange={handleCommentValueChange}
                  commentValue={commentValue}
                  onSendCommentClick={handleSendCommentClick}
                  onLikeListClick={handleLikesClick}
                  // onCommentLikeListClick={handleCommentLikesClick} // TODO Обработать
                  onCommentLikeListClick={() => {}}
                />
                {/* {isUserListOpened && ( //TODO передалать список лайков
                  <div className={styles["events__page-users"]}>
                    <BackIcon
                      onClick={() => setIsUserListOpened(false)}
                      className={styles["gallery__users-icon"]}
                    />
                    <UsersList
                      title="Отметки нравится"
                      users={ratedUsers}
                      onUserClick={() => {
                        setIsUserListOpened(false);
                      }}
                    />
                  </div>
                )} */}
              </div>
            ))}
          </InfiniteScroll>
          {/* {moments.map((moment: RecMomentsData) => (
            <div>
              <Moment
                moment={moment}
                onLikeClick={handleLikeClick}
                onCommentValueChange={handleCommentValueChange}
                commentValue={commentValue}
                onSendCommentClick={handleSendCommentClick}
                onLikeListClick={handleLikesClick}
                // onCommentLikeListClick={handleCommentLikesClick} // TODO Обработать
                onCommentLikeListClick={() => {}}
              />
              {isUserListOpened && ( //TODO передалать список лайков
                <div className={styles.gallery__users}>
                  <BackIcon
                    onClick={() => setIsUserListOpened(false)}
                    className={styles["gallery__users-icon"]}
                  />
                  <UsersList
                    title="Отметки нравится"
                    users={ratedUsers}
                    onUserClick={() => {
                      setIsUserListOpened(false);
                    }}
                  />
                </div>
              )}
            </div>
          ))} */}
        </div>

        <div className={styles["events__page-actions"]}>
          <h4 className={styles["events__page-title"]}>
            Популярные пользователи
          </h4>
          <UsersList
            onFollowClick={() => {}}
            users={mockUsers}
            actionText="Подписаться"
          />
        </div>
      </div>
      <ModalWindow
        active={isUserListOpened}
        handleBackdropClick={() => setIsUserListOpened(false)}
        className={styles["events__page-users-modal"]}
      >
        <div className={styles["events__page-users"]}>
          <BackIcon
            onClick={() => setIsUserListOpened(false)}
            className={styles["events__page-users-icon"]}
          />
          <UsersList
            title="Отметки нравится"
            users={ratedUsers}
            onUserClick={() => {
              setIsUserListOpened(false);
            }}
          />
        </div>
      </ModalWindow>
    </div>
  );
};

export default EventsFeedPage;
