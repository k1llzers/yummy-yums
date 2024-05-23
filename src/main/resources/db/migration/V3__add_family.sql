CREATE TABLE family(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE family_user(
    family_id INTEGER NOT NULL REFERENCES family(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    PRIMARY KEY (family_id, user_id)
)