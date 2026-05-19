package com.inbyuso.auth.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String brand;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "sale_price", precision = 10, scale = 2)
    private BigDecimal salePrice;

    @Column(precision = 2, scale = 1)
    private BigDecimal rating;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "main_category", length = 50)
    private String mainCategory;

    @Column(name = "sub_category", length = 100)
    private String subCategory;

    @Column(name = "detail_category", length = 100)
    private String detailCategory;

    @Column(name = "purchase_count", nullable = false)
    private int purchaseCount = 0;

    @Column(nullable = false)
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Product(String brand, String name, BigDecimal price, BigDecimal salePrice,
                   BigDecimal rating, String imageUrl, String mainCategory, String subCategory, String detailCategory) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
        this.detailCategory = detailCategory;
    }
}
