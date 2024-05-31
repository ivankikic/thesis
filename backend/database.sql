CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE farmsense;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sheets (
  id integer PRIMARY KEY DEFAULT nextval('sheet_id_seq'::regclass),
  name VARCHAR(255) NOT NULL,
  rows jsonb NOT NULL,
  columns jsonb NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

INSERT INTO users (name, surname, email, password) VALUES ('Ivan', 'Kikic', 'ivankikic49@gmail.com', 'admin');


--psql -U postgres
--\c farmsense
--\dt