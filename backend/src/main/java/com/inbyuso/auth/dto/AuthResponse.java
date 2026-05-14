package com.inbyuso.auth.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserInfo user
) {
    public record UserInfo(
            String id,
            String email,
            String username,
            String role
    ) {}

    public static AuthResponse of(String accessToken, long expiresInSeconds, UserInfo user) {
        return new AuthResponse(accessToken, "Bearer", expiresInSeconds, user);
    }
}
