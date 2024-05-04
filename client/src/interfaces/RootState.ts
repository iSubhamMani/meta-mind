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
}

export default RootState;
