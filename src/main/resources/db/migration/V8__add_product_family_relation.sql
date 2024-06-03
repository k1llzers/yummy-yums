CREATE TABLE family_product(
    family_id INTEGER NOT NULL REFERENCES family(id),
    product_id INTEGER NOT NULL REFERENCES product(id),
    PRIMARY KEY (family_id, product_id)
)