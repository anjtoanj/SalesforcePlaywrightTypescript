const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value)
    throw new Error(`Admin credentials are missing in environment variables`);
  return value;
};

export const Users = {
  adminUserName: requireEnv("ADMIN_USERNAME"),
  adminPassword: requireEnv("ADMIN_PASSWORD"),
};
