import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md
const swaggerDefinition = {
  info: {
    title: "mahjong-training-camp-server",
    version: "v0.0.0",
    description: "mahjong-training-camp-server Backend API",
  },
  servers: [
    {
      url: "/api",
      description: "API",
    },
  ],
  openapi: "3.0.2",
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ jwt: [], cookieAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["src/api/**/*.yaml", "src/api/**/*.ts"],
};

export default swaggerJSDoc(options);
