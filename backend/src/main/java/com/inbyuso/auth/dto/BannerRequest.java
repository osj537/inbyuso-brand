package com.inbyuso.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BannerRequest(
        @NotBlank(message = "제목은 필수입니다")
        @Size(max = 100)
        String title,

        @NotBlank(message = "이미지 URL은 필수입니다")
        @Size(max = 500)
        String imageUrl,

        @Size(max = 500)
        String linkUrl,

        int sortOrder
) {}
