export interface ServerConfig {
  PORT: number;
  COOKIE_SECRET: string;
  JWT_SECRET: string;
  PASSWORD_SALT: string;
  BODY_PARSER_LIMIT: string;
}
