DROP TABLE recipe_like;

CREATE TABLE recipe_like(
    recipe_id INTEGER REFERENCES recipe(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (recipe_id, user_id)
)