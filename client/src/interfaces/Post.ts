interface Author {
  _id: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Post;
