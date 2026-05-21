package com.inbyuso.auth.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ReviewRequest(
        @NotNull String productId,
        @NotNull @DecimalMin("1.0") @DecimalMax("5.0") BigDecimal rating,
        @NotBlank @Size(min = 10, max = 500) String text,
        String imageUrl
) {}
