CREATE TABLE family_product (
    family_id INT NOT NULL REFERENCES family(id),
    product_id INT NOT NULL REFERENCES product(id),
    quantity INT NOT NULL,
    PRIMARY KEY (family_id, product_id)
);