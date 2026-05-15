package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.BannerRequest;
import com.inbyuso.auth.dto.BannerResponse;
import com.inbyuso.auth.entity.Banner;
import com.inbyuso.auth.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    @Transactional(readOnly = true)
    public List<BannerResponse> getActiveBanners() {
        return bannerRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(BannerResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<BannerResponse> getAllBanners() {
        return bannerRepository.findAllByOrderBySortOrderAsc()
                .stream().map(BannerResponse::from).toList();
    }

    @Transactional
    public BannerResponse create(BannerRequest request) {
        Banner banner = Banner.builder()
                .title(request.title())
                .imageUrl(request.imageUrl())
                .linkUrl(request.linkUrl())
                .sortOrder(request.sortOrder())
                .build();
        return BannerResponse.from(bannerRepository.save(banner));
    }

    @Transactional
    public BannerResponse update(UUID id, BannerRequest request) {
        Banner banner = findById(id);
        banner.update(request.title(), request.imageUrl(), request.linkUrl(), request.sortOrder());
        return BannerResponse.from(banner);
    }

    @Transactional
    public BannerResponse toggleActive(UUID id) {
        Banner banner = findById(id);
        banner.toggleActive();
        return BannerResponse.from(banner);
    }

    @Transactional
    public void delete(UUID id) {
        bannerRepository.delete(findById(id));
    }

    private Banner findById(UUID id) {
        return bannerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "배너를 찾을 수 없습니다"));
    }
}
