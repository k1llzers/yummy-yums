CREATE TABLE recipe(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR NOT NULL,
    instruction VARCHAR NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES users(id),
    category_id INTEGER NOT NULL REFERENCES category(id),
    status smallint NOT NULL DEFAULT 1
);

CREATE TABLE product_count_mapping(
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE ON UPDATE CASCADE,
    count VARCHAR(100) NOT NULL,
    product_name VARCHAR(300) NOT NULL,
    PRIMARY KEY (recipe_id, product_name)
);

CREATE TABLE recipe_like(
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (recipe_id, user_id)
)