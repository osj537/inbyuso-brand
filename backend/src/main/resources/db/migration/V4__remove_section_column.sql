-- section 컬럼 제거 (섹션은 정렬 기준으로만 구분)
ALTER TABLE products DROP COLUMN IF EXISTS section;

-- 기존 더미데이터가 section별로 나뉘어 있어서 중복 제거 후 통합
-- 랭킹/추천 섹션 데이터 삭제 (NEW 섹션 데이터만 남김, 어차피 더미)
DELETE FROM products;

-- 통합 더미데이터 재삽입
INSERT INTO products (brand, name, price, sale_price, rating, image_url, category, purchase_count) VALUES
('Grten Lab',   '그린 토닉 에센스 150ml',       28000, NULL,  4.8, NULL, '스킨케어', 1250),
('Blure Sons',  '로즈 앰플 세럼 30ml',          42000, 22000, 4.6, NULL, '스킨케어',  980),
('Mellow Skin', '수분 크림 50ml',               35000, NULL,  4.9, NULL, '스킨케어',  870),
('Pure Lab',    '비건 클렌징 폼 120ml',          18000, 15000, 4.5, NULL, '클렌징',    760),
('Innature',    '녹차 토너 200ml',              24000, NULL,  4.7, NULL, '스킨케어',  650),
('Grten Lab',   '진정 마스크 팩 10매',           22000, NULL,  4.8, NULL, '스킨케어',  540),
('Blure Sons',  '콜라겐 아이크림 25ml',          38000, 29000, 4.4, NULL, '스킨케어',  430),
('Soft Core',   '선크림 SPF50+ 50ml',           32000, NULL,  4.6, NULL, '선케어',    320),
('Mellow Skin', '세럼 파운데이션 30ml',          45000, 38000, 4.3, NULL, '메이크업',  210),
('Pure Lab',    '립밤 3종 세트',                15000, NULL,  4.9, NULL, '메이크업',  180),
('Innature',    '베스트 에센스 100ml',           52000, NULL,  4.9, NULL, '스킨케어', 1100),
('Grten Lab',   '레티놀 세럼 30ml',             68000, 55000, 4.8, NULL, '스킨케어',  900),
('Soft Core',   '비타민C 앰플 20ml',            44000, 35000, 4.9, NULL, '스킨케어',  800),
('Blure Sons',  '나이아신아마이드 토너 150ml',   29000, NULL,  4.6, NULL, '스킨케어',  700),
('Pure Lab',    '젤 클렌저 150ml',              21000, NULL,  4.8, NULL, '클렌징',    600),
('Innature',    '수분 선크림 50ml',             34000, 28000, 4.7, NULL, '선케어',    500),
('Grten Lab',   '펩타이드 아이크림 20ml',        55000, NULL,  4.5, NULL, '스킨케어',  400),
('Soft Core',   '쿠션 파운데이션 15g',          42000, 36000, 4.6, NULL, '메이크업',  300),
('Mellow Skin', '립 틴트 4종',                 18000, NULL,  4.8, NULL, '메이크업',  200),
('Blure Sons',  '시카 크림 50ml',              33000, NULL,  4.7, NULL, '스킨케어',  150),
('Pure Lab',    '클렌징 오일 150ml',            27000, 22000, 4.6, NULL, '클렌징',    120),
('Innature',    '발효 에센스 120ml',            48000, NULL,  4.8, NULL, '스킨케어',  100),
('Grten Lab',   '보습 마스크 팩 5매',           19000, NULL,  4.5, NULL, '스킨케어',   90),
('Mellow Skin', '글로우 세럼 30ml',            41000, 33000, 4.9, NULL, '스킨케어',   80),
('Soft Core',   '자외선 차단 스틱 15g',         23000, NULL,  4.4, NULL, '선케어',     70),
('Blure Sons',  '틴티드 모이스처라이저 30ml',   36000, 29000, 4.7, NULL, '메이크업',   60),
('Pure Lab',    '천연 비누 3종',               24000, NULL,  4.6, NULL, '클렌징',     50),
('Innature',    '향수 50ml',                  78000, 65000, 4.5, NULL, '향수',        40),
('Grten Lab',   '헤어 세럼 80ml',             31000, NULL,  4.8, NULL, '헤어바디',   30),
('Mellow Skin', '히알루론산 크림 50ml',        39000, NULL,  4.7, NULL, '스킨케어',   20);
