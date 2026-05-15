package com.inbyuso.auth.dto;

import com.inbyuso.auth.entity.Product;

import java.math.BigDecimal;

public record ProductResponse(
        String id,
        String brand,
        String name,
        BigDecimal price,
        BigDecimal salePrice,
        BigDecimal rating,
        String imageUrl,
        String category,
        Integer discountRate
) {
    public static ProductResponse from(Product product) {
        Integer discountRate = null;
        if (product.getSalePrice() != null) {
            discountRate = (int) Math.round(
                    (1 - product.getSalePrice().doubleValue() / product.getPrice().doubleValue()) * 100
            );
        }
        return new ProductResponse(
                product.getId().toString(),
                product.getBrand(),
                product.getName(),
                product.getPrice(),
                product.getSalePrice(),
                product.getRating(),
                product.getImageUrl(),
                product.getCategory(),
                discountRate
        );
    }
}
