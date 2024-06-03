CREATE TABLE recipe_product(
    recipe_id INTEGER REFERENCES recipe(id),
    product VARCHAR NOT NULL
)