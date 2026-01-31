export const Users = {
  get adminUserName(): string {
    const value = process.env.ADMIN_USERNAME;
    if (!value)
      throw new Error("ADMIN_USERNAME is missing in environment variables");
    return value;
  },

  get adminPassword(): string {
    const value = process.env.ADMIN_PASSWORD;
    if (!value)
      throw new Error("ADMIN_PASSWORD is missing in environment variables");
    return value;
  },
};
