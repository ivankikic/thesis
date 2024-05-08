import pg from "pg";
const { Pool } = pg;

const localPoolConfig = {
  user: "postgres",
  password: "134905",
  host: "localhost",
  database: "farmsense",
  port: 5432,
};

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : localPoolConfig
);

export default pool;
