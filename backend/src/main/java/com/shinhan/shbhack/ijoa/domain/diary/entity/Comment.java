package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {
    @Id
    @Column(name="comment_id")
    @GeneratedValue(strategy = IDENTITY)
    private Integer commentId;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="diary_id")
    private Diary diary;

    @NotEmpty
    private String content;

}
