CREATE TABLE family_requests(
    family_id INTEGER NOT NULL REFERENCES family(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    PRIMARY KEY (family_id, user_id)
)