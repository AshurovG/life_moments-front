export type UserData = {
  email: string;
  username: string;
  image: string;
  rating?: number;
};

export type SubscriptionData = {
  author: UserData;
  subscriber: UserData;
  date?: string; // TODO: Поменять тип
};

export type CommentData = {
  text: string;
  author: UserData;
  date: string; // TODO: Поменять тип
};

export type LikeData = {
  // TODO: Сделать разраничение на комменты и публикации
  author: string; // TODO: оставить string либо объект UserData
  date?: string; // TODO: Поменять тип
};

export type TagData = {
  title: string; // TODO: Добавить либо сам момент, либо какое-то поле
};

export type MomentData = {
  title: string;
  text: string;
  author: UserData;
  date: string; // TODO: Поменять тип
  image: string;
  comments?: CommentData[];
  likes?: LikeData[];
  tags?: TagData[];
};
