package com.inbyuso.auth.repository;

import com.inbyuso.auth.entity.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByOrderByCreatedAtDesc(Pageable pageable);
    List<Review> findByProductIdOrderByCreatedAtDesc(UUID productId, Pageable pageable);
}
