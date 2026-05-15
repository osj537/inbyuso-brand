ALTER TABLE products ADD COLUMN purchase_count INTEGER NOT NULL DEFAULT 0;

-- 랭킹용 더미 구매수 업데이트
UPDATE products SET purchase_count = 1250 WHERE name = '베스트 에센스 100ml';
UPDATE products SET purchase_count = 980  WHERE name = '레티놀 세럼 30ml';
UPDATE products SET purchase_count = 870  WHERE name = '히알루론산 크림 50ml';
UPDATE products SET purchase_count = 760  WHERE name = '비타민C 앰플 20ml';
UPDATE products SET purchase_count = 650  WHERE name = '나이아신아마이드 토너 150ml';
UPDATE products SET purchase_count = 540  WHERE name = '젤 클렌저 150ml';
UPDATE products SET purchase_count = 430  WHERE name = '수분 선크림 50ml';
UPDATE products SET purchase_count = 320  WHERE name = '펩타이드 아이크림 20ml';
UPDATE products SET purchase_count = 210  WHERE name = '쿠션 파운데이션 15g';
UPDATE products SET purchase_count = 180  WHERE name = '립 틴트 4종';
