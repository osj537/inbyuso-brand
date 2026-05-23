ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(300);

-- 공백을 하이픈으로 치환하고, 한글/영문/숫자/하이픈만 남긴 후 소문자 변환
-- (한글 유니코드 범위 직접 지정 없이 공백과 특수문자만 제거하는 방식)
UPDATE products
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(
            REGEXP_REPLACE(TRIM(name), '\s+', '-', 'g'),
            '[!@#$%^&*()+={}\[\]|\\:;<>,.?/~`''"]', '', 'g'
        ),
        '-{2,}', '-', 'g'
    )
);

-- 중복 slug 처리
WITH duplicates AS (
    SELECT id,
           slug,
           ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at) AS rn
    FROM products
    WHERE slug IS NOT NULL
)
UPDATE products p
SET slug = d.slug || '-' || d.rn
FROM duplicates d
WHERE p.id = d.id AND d.rn > 1;

ALTER TABLE products ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
