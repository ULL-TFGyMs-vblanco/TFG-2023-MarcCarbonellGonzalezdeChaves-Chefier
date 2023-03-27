const databaseUser: string = process.env.DATABASE_USER as string;
const databaseName: string = process.env.DATABASE_NAME as string;
const databasePassword: string = process.env.DATABASE_PASSWORD as string;
const databaseHost: string = process.env.DATABASE_HOST as string;
const databaseConnectionOpts: string = process.env
  .DATABASE_CONNECTION_OPTIONS as string;

// Database connection url
export const remoteUrl = `mongodb+srv://${databaseUser}:${databasePassword}@${databaseHost}/${databaseName}?${databaseConnectionOpts}`;
