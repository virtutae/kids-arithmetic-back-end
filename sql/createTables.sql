DROP TABLE IF EXISTS food;
CREATE TABLE food (
    id serial PRIMARY KEY,
    title varchar(40) NOT NULL
);
INSERT INTO food (title)
VALUES ('sourdough'),
    ('olive oil'),
    ('pizza'),
    ('picanha'),
    ('gorgonzola'),
    ('basil');
-- CREATE TABLE timestamptable (
--     id serial PRIMARY KEY,
--     time_stamp timestamp
-- );
-- INSERT INTO timestamptable (time_stamp) VALUES (CURRENT_TIMESTAMP);