CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    rating NUMERIC(2, 1),
    image_url VARCHAR(500),
    category VARCHAR(50),
    section VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_section ON products(section);
CREATE INDEX idx_products_active ON products(active);

-- 신규입점 (NEW) 더미데이터
INSERT INTO products (brand, name, price, sale_price, rating, category, section) VALUES
('Grten Lab', '그린 토닉 에센스 150ml', 28000, NULL, 4.8, '스킨케어', 'NEW'),
('Blure Sons', '로즈 앰플 세럼 30ml', 42000, 22000, 4.6, '스킨케어', 'NEW'),
('Mellow Skin', '수분 크림 50ml', 35000, NULL, 4.9, '스킨케어', 'NEW'),
('Pure Lab', '비건 클렌징 폼 120ml', 18000, 15000, 4.5, '클렌징', 'NEW'),
('Innature', '녹차 토너 200ml', 24000, NULL, 4.7, '스킨케어', 'NEW'),
('Grten Lab', '진정 마스크 팩 10매', 22000, NULL, 4.8, '스킨케어', 'NEW'),
('Blure Sons', '콜라겐 아이크림 25ml', 38000, 29000, 4.4, '스킨케어', 'NEW'),
('Soft Core', '선크림 SPF50+ 50ml', 32000, NULL, 4.6, '선케어', 'NEW'),
('Mellow Skin', '세럼 파운데이션 30ml', 45000, 38000, 4.3, '메이크업', 'NEW'),
('Pure Lab', '립밤 3종 세트', 15000, NULL, 4.9, '메이크업', 'NEW');

-- 랭킹 (RANKING) 더미데이터
INSERT INTO products (brand, name, price, sale_price, rating, category, section) VALUES
('Innature', '베스트 에센스 100ml', 52000, NULL, 4.9, '스킨케어', 'RANKING'),
('Grten Lab', '레티놀 세럼 30ml', 68000, 55000, 4.8, '스킨케어', 'RANKING'),
('Mellow Skin', '히알루론산 크림 50ml', 39000, NULL, 4.7, '스킨케어', 'RANKING'),
('Soft Core', '비타민C 앰플 20ml', 44000, 35000, 4.9, '스킨케어', 'RANKING'),
('Blure Sons', '나이아신아마이드 토너 150ml', 29000, NULL, 4.6, '스킨케어', 'RANKING'),
('Pure Lab', '젤 클렌저 150ml', 21000, NULL, 4.8, '클렌징', 'RANKING'),
('Innature', '수분 선크림 50ml', 34000, 28000, 4.7, '선케어', 'RANKING'),
('Grten Lab', '펩타이드 아이크림 20ml', 55000, NULL, 4.5, '스킨케어', 'RANKING'),
('Soft Core', '쿠션 파운데이션 15g', 42000, 36000, 4.6, '메이크업', 'RANKING'),
('Mellow Skin', '립 틴트 4종', 18000, NULL, 4.8, '메이크업', 'RANKING');

-- 추천 (RECOMMEND) 더미데이터
INSERT INTO products (brand, name, price, sale_price, rating, category, section) VALUES
('Blure Sons', '시카 크림 50ml', 33000, NULL, 4.7, '스킨케어', 'RECOMMEND'),
('Pure Lab', '클렌징 오일 150ml', 27000, 22000, 4.6, '클렌징', 'RECOMMEND'),
('Innature', '발효 에센스 120ml', 48000, NULL, 4.8, '스킨케어', 'RECOMMEND'),
('Grten Lab', '보습 마스크 팩 5매', 19000, NULL, 4.5, '스킨케어', 'RECOMMEND'),
('Mellow Skin', '글로우 세럼 30ml', 41000, 33000, 4.9, '스킨케어', 'RECOMMEND'),
('Soft Core', '자외선 차단 스틱 15g', 23000, NULL, 4.4, '선케어', 'RECOMMEND'),
('Blure Sons', '틴티드 모이스처라이저 30ml', 36000, 29000, 4.7, '메이크업', 'RECOMMEND'),
('Pure Lab', '천연 비누 3종', 24000, NULL, 4.6, '클렌징', 'RECOMMEND'),
('Innature', '향수 50ml', 78000, 65000, 4.5, '향수', 'RECOMMEND'),
('Grten Lab', '헤어 세럼 80ml', 31000, NULL, 4.8, '헤어바디', 'RECOMMEND');
