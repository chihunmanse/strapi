module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql2",
        host: env("DATABASE_HOST", process.env.DB_HOST),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "strapi"),
        username: env("DATABASE_USERNAME", process.env.DB_USER),
        password: env("DATABASE_PASSWORD", process.env.DB_PASS),
      },
      options: {},
    },
  },
});
