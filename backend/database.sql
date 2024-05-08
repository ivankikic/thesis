CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE farmsense;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (username, email, password) VALUES ('admin', 'ivankikic49@gmail.com', 'admin');


--psql -U postgres
--\c farmsense
--\dt