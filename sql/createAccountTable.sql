DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    first_name character varying(50),
    last_name character varying(50),
    email character varying NOT NULL UNIQUE,
    username character varying(50) NOT NULL UNIQUE,
    password character varying NOT NULL
);