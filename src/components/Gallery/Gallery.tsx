import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
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

  const handleMomentClick = (id: number) => {
    getDetailedMoment(id);
    setIsPostOpened(true);
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
          />
        )}
        {/* TODO: сюда прокидывать ID поста для последующего выполнения запроса */}
      </ModalWindow>
    </>
  );
};

export default Gallery;
