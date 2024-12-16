export const getjwtSecret = (): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variable");
  }
  return process.env.JWT_SECRET;
};
