package com.shinhan.shbhack.ijoa.domain.member.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findNotificationsByReceiverAndNotificationType(Member receiver, NotificationType notificationType);
    List<Notification> findNotificationsById(Long id);
    List<Notification> findNotificationsByNotificationType(NotificationType notificationType);

}
