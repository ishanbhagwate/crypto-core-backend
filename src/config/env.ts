export const getAccessTokenJwtSecret = (): string => {
  if (!process.env.ACCESS_TOKEN_JWT_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_JWT_SECRET is not defined in the environment variable"
    );
  }
  return process.env.ACCESS_TOKEN_JWT_SECRET;
};
export const getRefresgTokenJwtSecret = (): string => {
  if (!process.env.REFRESH_TOKEN_JWT_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_JWT_SECRET is not defined in the environment variable"
    );
  }
  return process.env.REFRESH_TOKEN_JWT_SECRET;
};
