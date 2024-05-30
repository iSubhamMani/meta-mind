import Post from "./Post";
import User from "./User";

interface RootState {
  user: {
    user: User;
  };
  post: {
    refetch: boolean;
    featuredPosts: Post[];
    whatsNewPosts: Post[];
  };
  search: {
    searchQuery: string;
    cachedResults: object;
    hasMore: boolean;
    page: number;
    searchResults: Post[];
  };
  featured: {
    hasMore: boolean;
    page: number;
  };
  profile: {
    userPosts: Post[];
    bookMarkedPosts: Post[];
    hasMoreUserPosts: boolean;
    hasMoreBookMarkedPosts: boolean;
    userPostsPage: number;
    bookmarkedPostsPage: number;
    userPostsRefetch: boolean;
    bookmarkRefetch: boolean;
  };
}

export default RootState;
