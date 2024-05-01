import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.scss";
import LogoIcon from "components/Icons/LogoIcon";
import ProfileIcon from "components/Icons/ProfileIcon";
import HeartIcon from "components/Icons/HeartIcon";
import CompassIcon from "components/Icons/CompassIcon";
import EventsList from "components/EventsList";
import { mockLikes, mockSubscriptions } from "../../consts";

const Header = () => {
  const [isEventsOpened, setIsEventsOpened] = useState(false);
  const eventsListRef = useRef<HTMLDivElement>(null);
  const heartIconRef = useRef<SVGSVGElement>(null);

  const submenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    const eventsListElement = eventsListRef.current;
    const heartIconElement = heartIconRef.current; // Используем созданный ref

    if (
      eventsListElement &&
      heartIconElement &&
      !eventsListElement.contains(event.target as Node) &&
      !heartIconElement.contains(event.target as Node)
    ) {
      setIsEventsOpened(false);
    }
  };

  useEffect(() => {
    // Добавляем обработчик событий при монтировании компонента
    document.addEventListener("mousedown", handleClickOutside as any);

    // Удаляем обработчик событий при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  return (
    <header className={styles.header} onClick={handleClickOutside}>
      <div className={styles.header__wrapper}>
        <div className={styles["header__title-block"]}>
          <Link to="/events">
            <LogoIcon />
          </Link>
          <Link to="/events">
            <h4 className={styles.header__title}>Life Moments</h4>
          </Link>
        </div>

        <div className={styles.header__icons}>
          <Link to="/search">
            <CompassIcon />
          </Link>
          <HeartIcon
            ref={heartIconRef}
            onClick={() => {
              setIsEventsOpened(!isEventsOpened);
            }}
          />
          <Link to="/home">
            <ProfileIcon />
            <AnimatePresence>
              {isEventsOpened && (
                <motion.div
                  className={styles.submenu}
                  variants={submenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  ref={eventsListRef}
                >
                  <div>
                    <EventsList
                      subscriptions={mockSubscriptions} // TODO: Перепроверить типы данных
                      likes={mockLikes}
                      className={styles.header__events}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* {isEventsOpened && (
              <div ref={eventsListRef}>
                <EventsList
                  subscriptions={mockSubscriptions} // TODO: Перепроверить типы данных
                  likes={mockLikes}
                  className={styles.header__events}
                />
              </div>
            )} */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
