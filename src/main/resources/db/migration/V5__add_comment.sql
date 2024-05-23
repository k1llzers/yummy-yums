CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    recipe_id INTEGER REFERENCES recipe(id),
    user_id INTEGER REFERENCES users(id),
    reply_to_id INTEGER REFERENCES comment(id)
)