package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.BannerRequest;
import com.inbyuso.auth.dto.BannerResponse;
import com.inbyuso.auth.service.BannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    // 공개 - 활성 배너만 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<BannerResponse>>> getActiveBanners() {
        return ResponseEntity.ok(ApiResponse.success("배너 조회 성공", bannerService.getActiveBanners()));
    }

    // 관리자 - 전체 배너 조회
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<BannerResponse>>> getAllBanners() {
        return ResponseEntity.ok(ApiResponse.success("배너 전체 조회 성공", bannerService.getAllBanners()));
    }

    // 관리자 - 배너 생성
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> create(@Valid @RequestBody BannerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("배너가 등록되었습니다", bannerService.create(request)));
    }

    // 관리자 - 배너 수정
    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> update(
            @PathVariable UUID id,
            @Valid @RequestBody BannerRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("배너가 수정되었습니다", bannerService.update(id, request)));
    }

    // 관리자 - 활성/비활성 토글
    @PatchMapping("/admin/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> toggle(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("배너 상태가 변경되었습니다", bannerService.toggleActive(id)));
    }

    // 관리자 - 배너 삭제
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        bannerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("배너가 삭제되었습니다"));
    }
}
