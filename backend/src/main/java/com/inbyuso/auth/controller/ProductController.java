package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProducts(
            @RequestParam(defaultValue = "NEW") String section
    ) {
        List<ProductResponse> products = productService.getProductsBySection(section);
        return ResponseEntity.ok(ApiResponse.success("상품 조회 성공", products));
    }
}
