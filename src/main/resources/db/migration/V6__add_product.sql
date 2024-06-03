CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    price FLOAT NOT NULL,
    weight VARCHAR(40) NOT NULL,
    img_url VARCHAR(300) NOT NULL,
    store smallint NOT NULL
);