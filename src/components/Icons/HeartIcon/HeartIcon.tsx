import * as React from "react";
import { IconProps } from "../Icon";

const HeartIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { onClick, width, height, flag } = props;
  return (
    <>
      {flag ? (
        <svg
          style={{ cursor: "pointer" }}
          onClick={onClick}
          ref={ref}
          width={width ? width : 30}
          height={height ? height : 30}
          viewBox="0 0 512 512"
          fill="#da183e"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
        </svg>
      ) : (
        <svg
          style={{ cursor: "pointer" }}
          onClick={onClick}
          ref={ref}
          width={width ? width : 30}
          height={height ? height : 30}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 82.094 82.094"
          xmlSpace="preserve"
        >
          <g id="_x37_7_Essential_Icons_24_">
            <path
              id="Heart"
              d="M39.661,76.447l-32.9-32.6c-1.4-1.3-2.5-2.8-3.5-4.4c-5.4-8.9-4-20.3,3.5-27.7c4.3-4.3,10.1-6.7,16.2-6.7
       c9.6,0,15.6,5.6,18.1,8.8c2.5-3.2,8.5-8.8,18.1-8.8c6.1,0,11.9,2.4,16.2,6.7c7.4,7.4,8.9,18.8,3.5,27.7c-1,1.6-2.1,3.1-3.5,4.4
       l-32.9,32.6C41.661,77.247,40.461,77.247,39.661,76.447z M22.961,9.047c-5.1,0-9.8,2-13.4,5.5c-6.1,6.1-7.3,15.5-2.9,22.8
       c0.8,1.3,1.8,2.6,2.9,3.7l31.5,31.2l31.5-31.2c1.1-1.1,2.1-2.3,2.9-3.7c4.4-7.4,3.3-16.8-2.9-22.8c-3.6-3.5-8.4-5.5-13.4-5.5
       c-7.2,0-13.2,3.9-16.4,9.3c-0.8,1.3-2.7,1.3-3.5,0C36.161,12.947,30.161,9.047,22.961,9.047z"
            />
          </g>
        </svg>
      )}
    </>
  );
});

export default HeartIcon;
