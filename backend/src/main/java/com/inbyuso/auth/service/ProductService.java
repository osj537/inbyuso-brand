package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.entity.Product;
import com.inbyuso.auth.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductResponse> getProductsBySection(String section) {
        Product.Section sectionEnum = Product.Section.valueOf(section.toUpperCase());
        return productRepository
                .findByActiveTrueAndSectionOrderByCreatedAtDesc(sectionEnum)
                .stream()
                .map(ProductResponse::from)
                .toList();
    }
}
