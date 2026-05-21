package com.inbyuso.auth.controller;

import com.inbyuso.auth.dto.ApiResponse;
import com.inbyuso.auth.dto.ApplyRequest;
import com.inbyuso.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apply")
@RequiredArgsConstructor
public class ApplyController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> apply(@RequestBody ApplyRequest request) {
        emailService.sendApplyEmail(request);
        return ResponseEntity.ok(ApiResponse.success("입점 신청이 완료되었습니다"));
    }
}
