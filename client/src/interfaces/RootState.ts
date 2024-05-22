import Post from "./Post";

interface RootState {
  user: {
    user: {
      uid: string;
      email: string;
      emailVerified?: boolean;
      displayName: string;
      photoURL?: string;
      isAnonymous?: boolean;
    };
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
}

export default RootState;
