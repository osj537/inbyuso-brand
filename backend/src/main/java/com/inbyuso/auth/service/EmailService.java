package com.inbyuso.auth.service;

import com.inbyuso.auth.dto.ApplyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.to}")
    private String mailTo;

    public void sendApplyEmail(ApplyRequest req) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setTo(mailTo);
            helper.setReplyTo(req.contactEmail());
            helper.setSubject("[입점신청] " + req.brandNameKo());
            helper.setText(buildBody(req), false);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송 실패: " + e.getMessage());
        }
    }

    private String buildBody(ApplyRequest r) {
        return """
                [브랜드 기본 정보]
                브랜드명(한글): %s
                브랜드명(영문): %s
                설립연도: %s
                사업자등록번호: %s
                대표자명: %s
                브랜드 소개: %s
                인스타그램: %s
                스토어 URL: %s

                [제품 및 판매 정보]
                카테고리: %s
                대표 제품명: %s
                대표 제품 가격: %s
                전체 제품 수: %s
                평균 가격대: %s
                현재 판매 채널: %s
                월평균 매출: %s

                [담당자 연락처]
                담당자명: %s
                직책: %s
                이메일: %s
                연락처: %s
                선호 연락 방법: %s

                [추가 정보]
                신청 계기: %s
                인뷰소를 통해 이루고 싶은 것: %s
                추가 전달 내용: %s
                """.formatted(
                r.brandNameKo(), r.brandNameEn(), r.foundedYear(), r.bizNumber(), r.ceoName(),
                r.brandDesc(), r.instagram(), r.storeUrl(),
                r.categories(), r.mainProductName(), r.mainProductPrice(), r.productCount(), r.priceRange(), r.currentChannels(), r.revenue(),
                r.contactName(), r.contactRole(), r.contactEmail(), r.contactPhone(), r.preferContact(),
                r.applyReason(), r.brandGoal(), r.extra()
        );
    }
}
