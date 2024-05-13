import React from "react";
import { IconProps } from "../Icon";

const BackIcon: React.FC<IconProps> = ({ onClick, className }) => {
  return (
    // <svg
    //   onClick={onClick}
    //   version="1.1"
    //   id="Capa_1"
    //   xmlns="http://www.w3.org/2000/svg"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
    //   x="0px"
    //   y="0px"
    //   width={30}
    //   height={30}
    //   viewBox="0 0 459 459"
    //   xmlSpace="preserve"
    //   style={{ cursor: "pointer" }}
    //   fill="#3670b1"
    // >
    //   <g>
    //     <g id="reply">
    //       <path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z" />
    //     </g>
    //   </g>
    // </svg>

    <svg
      className={className}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
    >
      <g data-name="Layer 2" id="Layer_2">
        <path d="M20,25a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,0-1.42l8-8a1,1,0,1,1,1.42,1.42L13.41,16l7.3,7.29a1,1,0,0,1,0,1.42A1,1,0,0,1,20,25Z" />
      </g>
      <g id="frame">
        <rect style={{ fill: "none" }} height="30" width="30" />
      </g>
    </svg>
  );
};

export default BackIcon;
