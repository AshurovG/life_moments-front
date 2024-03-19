export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const mockUsers = [
  {
    email: "user1@mail.ru",
    username: "user1",
    rating: 1,
    image:
      "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg",
  },
  {
    email: "user2@mail.ru",
    username: "user2",
    rating: 2,
    image:
      "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg",
  },
  {
    email: "user3@mail.ru",
    username: "user3",
    rating: 3,
    image:
      "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg",
  },
  {
    email: "user4@mail.ru",
    username: "user4",
    rating: 4,
    image:
      "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg",
  },
];

export const mockMoments = [
  {
    title: "Момент 1",
    text: "Описание момента 1",
    author: mockUsers[0],
    date: "18 марта 19:00",
    image:
      "https://img.freepik.com/free-photo/bright-petals-gift-love-in-a-bouquet-generated-by-ai_188544-13370.jpg",
    likes: [{ author: "user1" }, { author: "user2" }, { author: "user3" }],
    comments: [
      {
        author: mockUsers[1],
        text: "Комментарий 1 Lorem ipsum dolor sit. Architecto assumenda explicabo libero placeat sapiente impedit sequi facere eveniet exercitationem id cumque praesentium quia eum, dolorem natus voluptates itaque! Fuga voluptatibus reiciendis itaque.",
        date: "18 марта 19:58",
      },
      {
        author: mockUsers[0],
        text: "Комментарий 2",
        date: "18 марта 21:13",
      },
      {
        author: mockUsers[2],
        text: "Комментарий 3",
        date: "18 марта 22:01",
      },
    ],
    tags: [{ title: "Природа" }, { title: "Красота" }, { title: "Искусство" }],
  },
  {
    title: "Момент 2",
    text: "Описание момента 2",
    author: mockUsers[1],
    date: "18 марта 19:10",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_N4umbFejqkrOVdFJX9rV6DZHsm9oyzJsQ9vXqgI6Q&s",
    likes: [{ author: "user2" }, { author: "user3" }],
    comments: [
      {
        author: mockUsers[0],
        text: "Комментарий 2",
        date: "18 марта 21:13",
      },
      {
        author: mockUsers[2],
        text: "Комментарий 3",
        date: "18 марта 22:01",
      },
    ],
    tags: [{ title: "Природа" }],
  },
  {
    title: "Момент 3",
    text: "Описание момента 3",
    author: mockUsers[2],
    date: "18 марта 19:20",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-images-of-winter-and-white-background-wallpapers-free-download-image_2935697.jpg",
    likes: [{ author: "user1" }, { author: "user3" }],
    comments: [
      {
        author: mockUsers[1],
        text: "Комментарий 1",
        date: "18 марта 19:23",
      },
    ],
  },
  {
    title: "Момент 4",
    text: "Описание момента 4",
    author: mockUsers[3],
    date: "18 марта 19:30",
    image:
      "https://i.pinimg.com/originals/25/52/81/25528187d8a32d1c998a63e3b301de86.jpg",
    likes: [{ author: "user1" }, { author: "user2" }, { author: "user3" }],
    tags: [{ title: "Природа" }, { title: "Красота" }],
  },
];

export const mockCurrentUser = {
  email: "current_user@mail.ru",
  username: "currentUser",
  followers: mockUsers,
  following: mockUsers,
  posts: [
    mockMoments[0],
    mockMoments[1],
    mockMoments[2],
    mockMoments[3],
    mockMoments[1],
    mockMoments[2],
    mockMoments[3],
  ],
  rating: 1,
  image:
    "https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg",
};
