package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.ReviewRequest;
import com.inbyuso.auth.dto.ReviewResponse;
import com.inbyuso.auth.entity.Product;
import com.inbyuso.auth.entity.Review;
import com.inbyuso.auth.entity.User;
import com.inbyuso.auth.repository.ProductRepository;
import com.inbyuso.auth.repository.ReviewRepository;
import com.inbyuso.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<ReviewResponse> getRecentReviews() {
        return reviewRepository.findByOrderByCreatedAtDesc(PageRequest.of(0, 8))
                .stream().map(ReviewResponse::from).toList();
    }

    public List<ReviewResponse> getProductReviews(UUID productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId, PageRequest.of(0, 20))
                .stream().map(ReviewResponse::from).toList();
    }

    @Transactional
    public ReviewResponse create(String userId, ReviewRequest request) {
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다"));
        Product product = productRepository.findById(UUID.fromString(request.productId()))
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다"));

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.rating())
                .text(request.text())
                .imageUrl(request.imageUrl())
                .build();

        return ReviewResponse.from(reviewRepository.save(review));
    }
}
