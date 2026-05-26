package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProducts(
            @RequestParam(defaultValue = "NEW") String section,
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<ProductResponse> products = productService.getProductsBySection(section, limit);
        return ResponseEntity.ok(ApiResponse.success("상품 조회 성공", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("상품 조회 성공", productService.getProduct(id)));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success("상품 조회 성공", productService.getProductBySlug(slug)));
    }

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductsByCategory(
            @RequestParam String mainCategory,
            @RequestParam(required = false) String subCategory,
            @RequestParam(required = false) String detailCategory
    ) {
        List<ProductResponse> products = productService.getProductsByCategory(mainCategory, subCategory, detailCategory);
        return ResponseEntity.ok(ApiResponse.success("카테고리 상품 조회 성공", products));
    }
}
