import React from "react";
import clsx from "clsx";
import styles from "./Gallery.module.scss";
import { MomentData } from "types";

type GalleryProps = {
  moments: MomentData[];
  onMomentClick: () => void;
  className?: string;
};

const Gallery: React.FC<GalleryProps> = ({
  moments,
  onMomentClick,
  className,
}) => {
  return (
    <div className={clsx(styles.gallery, className)}>
      {moments.map((moment) => (
        <img src={moment.image} alt="" onClick={onMomentClick} />
      ))}
    </div>
  );
};

export default Gallery;
