interface Author {
  _id: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export default Post;
