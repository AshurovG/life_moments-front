export type UserData = {
  id: number;
  username: string;
  email: string;
  image: string; // WAS image
  followers?: UserData[];
  followings?: UserData[];
  posts?: MomentData[];
  rating?: number;
};

export type RecUserData = {
  id: number;
  username: string;
  email: string;
  description: string;
  profile_picture: string;
  rating: number;
  registration_date: string;
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
