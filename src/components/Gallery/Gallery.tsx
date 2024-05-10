import React, { useState } from "react";
import clsx from "clsx";
import styles from "./Gallery.module.scss";
import { MomentData, RecMomentsData } from "types";
import ModalWindow from "components/ModalWindow";
import Moment from "components/Moment";

type GalleryProps = {
  // moments: MomentData[];
  moments: RecMomentsData[];
  onMomentClick?: () => void;
  className?: string;
};

const Gallery: React.FC<GalleryProps> = ({
  moments,
  onMomentClick,
  className,
}) => {
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [currentMoment, setCurrentMoment] = useState<RecMomentsData>();

  const onClick = (id: number) => {
    setIsPostOpened(true);
    setCurrentMoment(moments.find((moment) => moment.id === id));
  };

  return (
    <>
      <div className={clsx(styles.gallery, className)}>
        {moments.map((moment) => (
          <img src={moment.image} alt="" onClick={() => onClick(moment.id)} />
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
          />
        )}
        {/* TODO: сюда прокидывать ID поста для последующего выполнения запроса */}
      </ModalWindow>
    </>
  );
};

export default Gallery;
