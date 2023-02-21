export type AuthContextUser = {
  userId: string;
  email: string;
  emailVerified: boolean;
};

export type SetupUser = {
  userId: string;
  email: string;
  username?: string;
};

export type User = {
  userId: string;
  email: string;
  username: string;
};
