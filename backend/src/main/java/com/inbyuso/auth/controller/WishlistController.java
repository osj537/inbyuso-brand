package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{productId}/toggle")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> toggle(
            @AuthenticationPrincipal String userId,
            @PathVariable String productId
    ) {
        boolean wished = wishlistService.toggle(userId, productId);
        return ResponseEntity.ok(ApiResponse.success("찜 처리 완료", Map.of("wished", wished)));
    }

    @GetMapping("/{productId}/status")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> status(
            @AuthenticationPrincipal String userId,
            @PathVariable String productId
    ) {
        boolean wished = wishlistService.isWished(userId, productId);
        return ResponseEntity.ok(ApiResponse.success("찜 상태 조회 성공", Map.of("wished", wished)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getMyWishlist(
            @AuthenticationPrincipal String userId
    ) {
        List<ProductResponse> products = wishlistService.getMyWishlist(userId);
        return ResponseEntity.ok(ApiResponse.success("찜 목록 조회 성공", products));
    }
}
