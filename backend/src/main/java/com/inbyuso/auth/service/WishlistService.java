package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.ProductResponse;
import com.inbyuso.auth.entity.Product;
import com.inbyuso.auth.entity.User;
import com.inbyuso.auth.entity.Wishlist;
import com.inbyuso.auth.repository.ProductRepository;
import com.inbyuso.auth.repository.UserRepository;
import com.inbyuso.auth.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public boolean toggle(String userId, String productId) {
        UUID userUuid = UUID.fromString(userId);
        UUID productUuid = UUID.fromString(productId);

        return wishlistRepository.findByUserIdAndProductId(userUuid, productUuid)
                .map(wishlist -> {
                    wishlistRepository.delete(wishlist);
                    return false;
                })
                .orElseGet(() -> {
                    User user = userRepository.findById(userUuid)
                            .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다"));
                    Product product = productRepository.findById(productUuid)
                            .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다"));
                    wishlistRepository.save(Wishlist.builder().user(user).product(product).build());
                    return true;
                });
    }

    public boolean isWished(String userId, String productId) {
        return wishlistRepository.existsByUserIdAndProductId(
                UUID.fromString(userId),
                UUID.fromString(productId)
        );
    }

    public List<ProductResponse> getMyWishlist(String userId) {
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(UUID.fromString(userId))
                .stream()
                .map(w -> ProductResponse.from(w.getProduct()))
                .toList();
    }
}
