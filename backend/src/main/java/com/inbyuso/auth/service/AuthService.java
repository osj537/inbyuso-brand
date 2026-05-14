package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.AuthResponse;
import com.inbyuso.auth.dto.LoginRequest;
import com.inbyuso.auth.dto.SignupRequest;
import com.inbyuso.auth.entity.RefreshToken;
import com.inbyuso.auth.entity.User;
import com.inbyuso.auth.exception.AuthException;
import com.inbyuso.auth.repository.RefreshTokenRepository;
import com.inbyuso.auth.repository.UserRepository;
import com.inbyuso.auth.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${jwt.access-token-expiry-ms}")
    private long accessTokenExpiryMs;

    @Value("${jwt.refresh-token-expiry-ms}")
    private long refreshTokenExpiryMs;

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Transactional
    public AuthResponse signup(SignupRequest request, HttpServletResponse response) {
        if (userRepository.existsByEmail(request.email())) {
            throw AuthException.emailAlreadyExists();
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .username(request.username())
                .build();

        userRepository.save(user);

        return issueTokensAndRespond(user, response, null);
    }

    @Transactional
    public AuthResponse login(LoginRequest request, HttpServletResponse response, HttpServletRequest httpRequest) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(AuthException::invalidCredentials);

        if (user.isLocked()) {
            throw AuthException.accountLocked();
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            user.recordFailedLogin();
            userRepository.save(user);
            throw AuthException.invalidCredentials();
        }

        user.resetFailedLogin();
        userRepository.save(user);

        String clientIp = extractClientIp(httpRequest);
        return issueTokensAndRespond(user, response, clientIp);
    }

    @Transactional
    public AuthResponse refresh(String rawRefreshToken, HttpServletResponse response, HttpServletRequest httpRequest) {
        String tokenHash = hashToken(rawRefreshToken);
        RefreshToken stored = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(AuthException::invalidRefreshToken);

        if (!stored.isValid()) {
            // 토큰 재사용 감지 시 해당 사용자의 모든 토큰 무효화 (Token Rotation)
            refreshTokenRepository.revokeAllByUser(stored.getUser());
            throw AuthException.invalidRefreshToken();
        }

        stored.revoke();
        refreshTokenRepository.save(stored);

        String clientIp = extractClientIp(httpRequest);
        return issueTokensAndRespond(stored.getUser(), response, clientIp);
    }

    @Transactional
    public void logout(String rawRefreshToken, HttpServletResponse response) {
        if (rawRefreshToken != null) {
            String tokenHash = hashToken(rawRefreshToken);
            refreshTokenRepository.findByTokenHash(tokenHash)
                    .ifPresent(token -> {
                        token.revoke();
                        refreshTokenRepository.save(token);
                    });
        }
        clearRefreshTokenCookie(response);
    }

    private AuthResponse issueTokensAndRespond(User user, HttpServletResponse response, String clientIp) {
        String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());

        String rawRefreshToken = generateSecureToken();
        String tokenHash = hashToken(rawRefreshToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .tokenHash(tokenHash)
                .expiresAt(LocalDateTime.now().plusSeconds(refreshTokenExpiryMs / 1000))
                .clientIp(clientIp)
                .build();
        refreshTokenRepository.save(refreshToken);

        setRefreshTokenCookie(response, rawRefreshToken);

        return AuthResponse.of(
                accessToken,
                accessTokenExpiryMs / 1000,
                new AuthResponse.UserInfo(
                        user.getId().toString(),
                        user.getEmail(),
                        user.getUsername(),
                        user.getRole().name()
                )
        );
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("refresh_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/auth/refresh");
        cookie.setMaxAge((int) (refreshTokenExpiryMs / 1000));
        // SameSite=Strict via header (Cookie API doesn't support SameSite directly in all versions)
        response.addCookie(cookie);
        response.addHeader("Set-Cookie",
                String.format("refresh_token=%s; Path=/api/auth/refresh; HttpOnly; Secure; SameSite=Strict; Max-Age=%d",
                        token, refreshTokenExpiryMs / 1000));
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        response.addHeader("Set-Cookie",
                "refresh_token=; Path=/api/auth/refresh; HttpOnly; Secure; SameSite=Strict; Max-Age=0");
    }

    private String generateSecureToken() {
        byte[] bytes = new byte[64];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    private String extractClientIp(HttpServletRequest request) {
        if (request == null) return null;
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
