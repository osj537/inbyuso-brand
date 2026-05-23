package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.entity.Product;
import com.inbyuso.auth.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private static final int DEFAULT_LIMIT = 10;
    private final ProductRepository productRepository;

    public ProductResponse getProduct(String id) {
        Product product = productRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다"));
        return ProductResponse.from(product);
    }

    public List<ProductResponse> getProductsBySection(String section) {
        Pageable pageable = PageRequest.of(0, DEFAULT_LIMIT);

        List<Product> products = switch (section.toUpperCase()) {
            case "NEW"      -> productRepository.findByActiveTrueOrderByCreatedAtDesc(pageable);
            case "RANKING"  -> productRepository.findByActiveTrueOrderByPurchaseCountDesc(pageable);
            case "RECOMMEND"-> productRepository.findByActiveTrueOrderByRatingDesc(pageable);
            default -> productRepository.findByActiveTrueOrderByCreatedAtDesc(pageable);
        };

        return products.stream().map(ProductResponse::from).toList();
    }

    public List<ProductResponse> getProductsByCategory(String mainCategory, String subCategory, String detailCategory) {
        Pageable pageable = PageRequest.of(0, 40);

        List<Product> products;
        if (detailCategory != null && !detailCategory.isBlank()) {
            products = productRepository.findByActiveTrueAndMainCategoryAndDetailCategoryOrderByCreatedAtDesc(mainCategory, detailCategory, pageable);
        } else if (subCategory != null && !subCategory.isBlank()) {
            products = productRepository.findByActiveTrueAndMainCategoryAndSubCategoryOrderByCreatedAtDesc(mainCategory, subCategory, pageable);
        } else {
            products = productRepository.findByActiveTrueAndMainCategoryOrderByCreatedAtDesc(mainCategory, pageable);
        }

        return products.stream().map(ProductResponse::from).toList();
    }
}
