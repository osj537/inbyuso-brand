package com.inbyuso.auth.dto;

import com.inbyuso.auth.entity.Product;

import java.math.BigDecimal;

public record ProductResponse(
        String id,
        String slug,
        String brand,
        String name,
        BigDecimal price,
        BigDecimal salePrice,
        BigDecimal rating,
        String imageUrl,
        String mainCategory,
        String subCategory,
        String detailCategory,
        Integer discountRate,
        int purchaseCount
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
                product.getSlug(),
                product.getBrand(),
                product.getName(),
                product.getPrice(),
                product.getSalePrice(),
                product.getRating(),
                product.getImageUrl(),
                product.getMainCategory(),
                product.getSubCategory(),
                product.getDetailCategory(),
                discountRate,
                product.getPurchaseCount()
        );
    }
}
