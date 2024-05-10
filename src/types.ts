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
  user_id: number;
  username: string;
  email: string;
  description: string;
  profile_picture: string;
  rating: number;
  registration_date: string;
};

export type RecMomentsData = {
  id: number;
  title: string;
  description: string;
  publication_date: Date;
  image: string;
  id_author: number;
  comments?: CommentData[];
  likes?: LikeData[];
  tags?: TagData[];
};

export type RecSubscriptionsData = {
  id: number;
  subscription_date: Date;
  id_author: number;
  id_subscriber: number;
};

export type SettingsData = {
  username?: string;
  email?: string;
  description?: string;
  profile_picture?: File;
};

export type CreatedMomentData = {
  title: string;
  description?: string;
  image: File;
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
