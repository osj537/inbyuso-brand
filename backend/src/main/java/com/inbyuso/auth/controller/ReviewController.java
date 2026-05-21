package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.ReviewRequest;
import com.inbyuso.auth.dto.ReviewResponse;
import com.inbyuso.auth.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getRecentReviews() {
        return ResponseEntity.ok(ApiResponse.success("리뷰 조회 성공", reviewService.getRecentReviews()));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getProductReviews(@PathVariable UUID productId) {
        return ResponseEntity.ok(ApiResponse.success("상품 리뷰 조회 성공", reviewService.getProductReviews(productId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> create(
            Authentication auth,
            @Valid @RequestBody ReviewRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("리뷰가 등록되었습니다", reviewService.create(auth.getName(), request)));
    }
}
