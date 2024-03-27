export type UserData = {
  id: number;
  email: string;
  username: string;
  image: string;
  followers?: UserData[];
  followings?: UserData[];
  posts?: MomentData[];
  rating?: number;
};

export type SubscriptionData = {
  id: number;
  author: UserData;
  follower: UserData;
  date?: string; // TODO: Поменять тип
};

export type CommentData = {
  id: number;
  text: string;
  author: UserData;
  date: string; // TODO: Поменять тип
};

export type LikeData = {
  id: number;
  author: UserData;
  moment?: MomentData;
  comment?: CommentData;
  date?: string; // TODO: Поменять тип
};

export type TagData = {
  id: number;
  title: string; // TODO: Добавить либо сам момент, либо какое-то поле
};

export type MomentData = {
  id: number;
  title: string;
  text: string;
  author: UserData;
  date: string; // TODO: Поменять тип
  image: string;
  comments?: CommentData[];
  likes?: LikeData[];
  tags?: TagData[];
};
