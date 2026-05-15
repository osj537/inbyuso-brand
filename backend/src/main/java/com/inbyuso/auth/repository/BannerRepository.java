package com.inbyuso.auth.repository;

import com.inbyuso.auth.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BannerRepository extends JpaRepository<Banner, UUID> {
    List<Banner> findByActiveTrueOrderBySortOrderAsc();
    List<Banner> findAllByOrderBySortOrderAsc();
}
