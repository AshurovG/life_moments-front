import React, { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { useUserInfo } from "slices/UserSlice";
import styles from "./Gallery.module.scss";
import { MomentData, RecMomentsData, RecUsersSubscriptions } from "types";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";
import UsersList from "components/UsersList";
import { toast } from "react-toastify";
import BackIcon from "components/Icons/BackIcon";

type GalleryProps = {
  moments: RecMomentsData[];
  className?: string;
};

const Gallery: React.FC<GalleryProps> = ({ moments, className }) => {
  const userInfo = useUserInfo();
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [currentMoment, setCurrentMoment] = useState<RecMomentsData>();
  const [commentValue, setCommentValue] = useState("");
  const [ratedUsers, setRatedUsers] = useState<RecUsersSubscriptions[]>([]);
  const [isUserListOpened, setIsUserListOpened] = useState(false);

  useEffect(() => {
    console.log(isUserListOpened);
  }, [isUserListOpened]);

  const getDetailedMoment = async (id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments/detailed?id=${id}`,
        {
          withCredentials: true,
        }
      );

      let momentData = response.data.moment;

      setCurrentMoment(momentData);
    } catch (error) {
      throw error;
    }
  };

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

  const getCommentLikes = async (comment_id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments/comment/likes?id=${comment_id}`,
        {
          withCredentials: true,
        }
      );

      setRatedUsers(response.data);
    } catch (error) {
      toast.error("Что-то пошло не так...");
    }
  };

  const handleLikesClick = async (moment_id: number) => {
    await getLikes(moment_id);
    setIsUserListOpened(true);
  };

  const handleCommentLikesClick = async (comment_id: number) => {
    await getCommentLikes(comment_id);
    setIsUserListOpened(true);
  };

  const handleMomentClick = (id: number) => {
    setCommentValue("");
    getDetailedMoment(id);
    setIsPostOpened(true);
  };

  const handleLikeClick = async (
    moment_id: number | undefined,
    comment_id: number | undefined
  ) => {
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

    if (currentMoment) {
      getDetailedMoment(currentMoment?.id);
    }
  };

  const handleSendCommentClick = async (moment_id: number) => {
    if (commentValue) {
      await leaveComment(moment_id);
      getDetailedMoment(moment_id);
    }
    setCommentValue("");
  };

  const handleCommentValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentValue(event.target.value);
  };

  return (
    <>
      <div className={clsx(styles.gallery, className)}>
        {moments.map((moment) => (
          <img
            src={moment.image}
            alt=""
            onClick={() => handleMomentClick(moment.id)}
          />
        ))}
      </div>

      <ModalWindow
        active={isPostOpened}
        handleBackdropClick={() => {
          setIsPostOpened(false);
          setIsUserListOpened(false);
        }}
        className={styles["gallery__modal"]}
      >
        {currentMoment && (
          <Moment
            className={styles["gallery__moment"]}
            moment={currentMoment}
            isModal
            isModalOpened={isPostOpened}
            onUserClick={() => setIsPostOpened(false)}
            onLikeClick={handleLikeClick}
            onCommentValueChange={handleCommentValueChange}
            commentValue={commentValue}
            onSendCommentClick={handleSendCommentClick}
            onLikeListClick={handleLikesClick}
            onCommentLikeListClick={handleCommentLikesClick}
          />
        )}
        {/* TODO: сюда прокидывать ID поста для последующего выполнения запроса */}
      </ModalWindow>

      {isUserListOpened && (
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
              setIsPostOpened(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
