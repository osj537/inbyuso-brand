CREATE TABLE wishlists (
    id         UUID        NOT NULL DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL,
    product_id UUID        NOT NULL,
    created_at TIMESTAMP   NOT NULL DEFAULT now(),

    CONSTRAINT pk_wishlists PRIMARY KEY (id),
    CONSTRAINT uq_wishlists_user_product UNIQUE (user_id, product_id),
    CONSTRAINT fk_wishlists_user    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
    CONSTRAINT fk_wishlists_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_wishlists_user_id    ON wishlists (user_id);
CREATE INDEX idx_wishlists_product_id ON wishlists (product_id);
