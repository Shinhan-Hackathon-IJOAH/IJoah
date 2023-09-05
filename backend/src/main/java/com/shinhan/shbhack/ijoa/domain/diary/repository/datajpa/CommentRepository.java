package com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.diary.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}