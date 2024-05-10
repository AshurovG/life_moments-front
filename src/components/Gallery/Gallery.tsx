import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { useUserInfo } from "slices/UserSlice";
import styles from "./Gallery.module.scss";
import { MomentData, RecMomentsData } from "types";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";

type GalleryProps = {
  // moments: MomentData[];
  moments: RecMomentsData[];
  className?: string;
};

const Gallery: React.FC<GalleryProps> = ({ moments, className }) => {
  const userInfo = useUserInfo();
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [currentMoment, setCurrentMoment] = useState<RecMomentsData>();

  const getDetailedMoment = async (id: number) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/moments/detailed?id=${id}`,
        {
          withCredentials: true,
        }
      );

      let momentData = response.data.moment;

      momentData = {
        ...momentData,
        author: response.data.author,
        likes: response.data.likes,
        comments: response.data.comments,
      };

      console.log(momentData);

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
    } catch (error) {}
  };

  const handleMomentClick = (id: number) => {
    getDetailedMoment(id);
    setIsPostOpened(true);
  };

  const handleLikeClick = async (
    moment_id: number | undefined,
    comment_id: number | undefined
  ) => {
    if (moment_id) {
      await makeLike(moment_id, undefined);
    } else if (comment_id) {
      await makeLike(undefined, comment_id);
    }

    if (currentMoment) {
      getDetailedMoment(currentMoment?.id);
    }
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
        handleBackdropClick={() => setIsPostOpened(false)}
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
          />
        )}
        {/* TODO: сюда прокидывать ID поста для последующего выполнения запроса */}
      </ModalWindow>
    </>
  );
};

export default Gallery;
