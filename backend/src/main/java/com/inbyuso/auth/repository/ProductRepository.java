package com.inbyuso.auth.repository;

import com.inbyuso.auth.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByActiveTrueAndSectionOrderByCreatedAtDesc(Product.Section section);
}
