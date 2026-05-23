package com.inbyuso.auth.repository;

import com.inbyuso.auth.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    // 신규입점: 등록 최신순
    List<Product> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    // 랭킹: 구매수 많은순
    List<Product> findByActiveTrueOrderByPurchaseCountDesc(Pageable pageable);

    // 추천: 평점 높은순
    List<Product> findByActiveTrueOrderByRatingDesc(Pageable pageable);

    // 카테고리별 조회
    List<Product> findByActiveTrueAndMainCategoryOrderByCreatedAtDesc(String mainCategory, Pageable pageable);

    // 서브 카테고리별 조회
    List<Product> findByActiveTrueAndMainCategoryAndSubCategoryOrderByCreatedAtDesc(String mainCategory, String subCategory, Pageable pageable);

    // 디테일 카테고리별 조회
    List<Product> findByActiveTrueAndMainCategoryAndDetailCategoryOrderByCreatedAtDesc(String mainCategory, String detailCategory, Pageable pageable);

    Optional<Product> findBySlug(String slug);
}
