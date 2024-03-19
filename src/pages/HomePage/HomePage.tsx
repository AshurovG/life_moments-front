import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { mockCurrentUser } from "../../consts";
import Button from "components/Button";

const HomePage: React.FC<{ isAuthUser?: boolean }> = ({ isAuthUser }) => {
  const navigate = useNavigate();

  const onNewPostButtonClick = () => {
    navigate("/moment");
  };

  return (
    <div className={styles.home__page}>
      <div className={styles["home__page-wrapper"]}>
        <div className={styles["home__page-header"]}>
          <div className={styles["home__page-profile"]}>
            <img
              className={styles["home__page-image"]}
              src={mockCurrentUser.image}
              alt="user"
            />
            <h4 className={styles["home__page-profile-text"]}>
              {mockCurrentUser.username}
            </h4>
          </div>
          <div className={styles["home__page-info"]}>
            <div className={styles["home__page-info-details"]}>
              <div className={styles["home__page-info-item"]}>
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.posts.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>публикации</p>
              </div>

              <div className={styles["home__page-info-item"]}>
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.followers.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписчики</p>
              </div>

              <div className={styles["home__page-info-item"]}>
                <p className={styles["home__page-info-title"]}>
                  {mockCurrentUser.following.length}
                </p>

                <p className={styles["home__page-info-subtitle"]}>подписки</p>
              </div>
            </div>

            {!isAuthUser ? (
              <div className={styles["home__page-info-actions"]}>
                <Button className={styles["home__page-info-btn"]}>
                  Подписаться
                </Button>
              </div>
            ) : (
              <div className={styles["home__page-info-actions"]}>
                <Button className={styles["home__page-info-btn"]}>
                  Редактировать
                </Button>
                <Button
                  onClick={onNewPostButtonClick}
                  className={styles["home__page-info-btn"]}
                >
                  Новая публикация
                </Button>
              </div>
            )}
          </div>
        </div>

        <p className={styles["home__page-description"]}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          consequatur maiores vero vel quasi ipsam atque asperiores repellat
          aspernatur tenetur!
        </p>

        <div className={styles["home__page-gallery"]}>
          {mockCurrentUser.posts.map((element) => (
            <img src={element.image} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
