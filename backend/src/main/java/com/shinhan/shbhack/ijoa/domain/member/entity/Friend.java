package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Friend extends BaseEntity {

    @Id
    @Column(name = "friend_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "first_friend_id")
    private Member firstFriend;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "second_friend_id")
    private Member secondFriend;

    @Builder
    public Friend(Long id, Member firstFriend, Member secondFriend) {
        this.id = id;
        this.firstFriend = firstFriend;
        this.secondFriend = secondFriend;
    }



}
