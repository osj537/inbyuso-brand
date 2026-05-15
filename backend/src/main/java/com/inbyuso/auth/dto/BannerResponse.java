package com.inbyuso.auth.dto;

import com.inbyuso.auth.entity.Banner;

public record BannerResponse(
        String id,
        String title,
        String imageUrl,
        String linkUrl,
        int sortOrder,
        boolean active
) {
    public static BannerResponse from(Banner banner) {
        return new BannerResponse(
                banner.getId().toString(),
                banner.getTitle(),
                banner.getImageUrl(),
                banner.getLinkUrl(),
                banner.getSortOrder(),
                banner.isActive()
        );
    }
}
