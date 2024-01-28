DROP TABLE IF EXISTS cards;

CREATE TABLE IF NOT EXISTS cards
(
    id SERIAL PRIMARY KEY,
    account_id bigint NOT NULL REFERENCES account(account_id),
    scry_id character varying NOT NULL,
    card_name character varying NOT NULL,
    price numeric NOT NULL,
    quantity integer NOT NULL,
    image_uris jsonb NULL
);