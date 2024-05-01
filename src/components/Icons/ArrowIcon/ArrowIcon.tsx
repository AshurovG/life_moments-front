import styles from "./ArrowIcon.module.scss";

const CompassIcon = () => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={styles.icon}
    >
      <title>ic_upward</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Icons"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <g
          id="24-px-Icons"
          transform="translate(-266.000000, -27.000000)"
          stroke="#fff"
        >
          <g id="ic_upward" transform="translate(264.000000, 24.000000)">
            <g
              transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
              id="ic_back"
            >
              <g
                transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "
                stroke-width="2"
              >
                <g id="forward" transform="translate(4.000000, 3.000000)">
                  <path d="M0,9 L16,9" id="Line"></path>
                  <path d="M16,9 L7.93774223,0.937742233" id="Line"></path>
                  <path d="M16,9 L7.93774223,17.0622578" id="Line"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CompassIcon;
