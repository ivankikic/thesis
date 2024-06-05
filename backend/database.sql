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
  name VARCHAR(255) NOT NULL UNIQUE,
  rows jsonb NOT NULL,
  columns jsonb NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dashboards (
  id integer PRIMARY KEY DEFAULT nextval('dashboard_id_seq'::regclass),
  name VARCHAR(255) NOT NULL UNIQUE,
  data jsonb NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS connections (
  id integer PRIMARY KEY DEFAULT nextval('connection_id_seq'::regclass),
  name VARCHAR(255) NOT NULL UNIQUE,
  sheet_id integer NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  name VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  value VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id integer PRIMARY KEY DEFAULT nextval('audit_log_id_seq'::regclass),
  user_id uuid NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  log_type VARCHAR(255) NOT NULL,
  data jsonb NOT NULL
);

CREATE TABLE file_imports (
  id SERIAL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL,
  rows_counter INTEGER NOT NULL,
  file_name VARCHAR(255) NOT NULL,
	sheet_id INTEGER NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_sources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL
);

CREATE TABLE sensor_logs (
  id SERIAL PRIMARY KEY,
  sensor_id INTEGER NOT NULL,
  data jsonb NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

INSERT INTO users (name, surname, email, password) VALUES ('Ivan', 'Kikic', 'ivankikic49@gmail.com', 'admin');


--psql -U postgres
--\c farmsense
--\dt