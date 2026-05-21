package com.inbyuso.auth.dto;

public record ApplyRequest(
        String brandNameKo,
        String brandNameEn,
        String foundedYear,
        String bizNumber,
        String ceoName,
        String brandDesc,
        String instagram,
        String storeUrl,
        String categories,
        String mainProductName,
        String mainProductPrice,
        String productCount,
        String priceRange,
        String currentChannels,
        String revenue,
        String contactName,
        String contactRole,
        String contactEmail,
        String contactPhone,
        String preferContact,
        String applyReason,
        String brandGoal,
        String extra
) {}
