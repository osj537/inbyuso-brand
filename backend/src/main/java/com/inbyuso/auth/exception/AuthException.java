package com.inbyuso.auth.exception;

import org.springframework.http.HttpStatus;

public class AuthException extends RuntimeException {

    private final HttpStatus status;

    public AuthException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public static AuthException invalidCredentials() {
        return new AuthException("이메일 또는 비밀번호가 올바르지 않습니다", HttpStatus.UNAUTHORIZED);
    }

    public static AuthException accountLocked() {
        return new AuthException("계정이 일시적으로 잠겼습니다. 잠시 후 다시 시도해주세요", HttpStatus.LOCKED);
    }

    public static AuthException emailAlreadyExists() {
        return new AuthException("이미 사용 중인 이메일입니다", HttpStatus.CONFLICT);
    }

    public static AuthException invalidRefreshToken() {
        return new AuthException("유효하지 않은 리프레시 토큰입니다", HttpStatus.UNAUTHORIZED);
    }
}
