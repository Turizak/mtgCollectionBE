DROP TABLE IF EXISTS cards;

DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    first_name character varying(50),
    last_name character varying(50),
    email character varying NOT NULL UNIQUE,
    username character varying(50) NOT NULL UNIQUE,
    password character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    account_id bigint NOT NULL REFERENCES account(account_id),
    scry_id character varying NOT NULL,
    card_name character varying NOT NULL,
    price numeric NOT NULL,
    quantity integer NOT NULL,
    image_uris jsonb NULL
);