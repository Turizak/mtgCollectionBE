DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account
(
    account_id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying NOT NULL
);