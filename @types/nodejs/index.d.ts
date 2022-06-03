declare module NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    PORT: string;

    ATLASSIAN_API_URL: string;
    ATLASSIAN_CLOUD_URL: string;
    ATLASSIAN_EMAIL: string;
    ATLASSIAN_TOKEN: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_COOKIE_EXPIRES_IN: number;
  }
}
