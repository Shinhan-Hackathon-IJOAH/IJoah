package com.shinhan.shbhack.ijoa.domain.member.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
