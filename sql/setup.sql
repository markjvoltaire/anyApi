-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pizza;

CREATE TABLE pizza (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    toppings TEXT NOT NULL,
    cheese TEXT NOT NULL
);

INSERT INTO pizza (toppings, cheese) VALUES ( 'ham', 'swiss');