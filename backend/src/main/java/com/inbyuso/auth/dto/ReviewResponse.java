package com.inbyuso.auth.dto;

import com.inbyuso.auth.entity.Review;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

public record ReviewResponse(
        String id,
        String productId,
        String productName,
        String email,
        BigDecimal rating,
        String text,
        String imageUrl,
        String createdAt
) {
    public static ReviewResponse from(Review r) {
        return new ReviewResponse(
                r.getId().toString(),
                r.getProduct().getId().toString(),
                r.getProduct().getName(),
                r.getUser().getEmail(),
                r.getRating(),
                r.getText(),
                r.getImageUrl(),
                r.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"))
        );
    }
}
