package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Member extends BaseEntity {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Size(max = 20)
    @NotNull
    private String name;

    @Size(max = 10)
    @NotNull
    private String nickname;

    @Email
    @Size(max = 40)
    @NotNull
    private String email;

    @NotNull
    private String password;

    @Size(max = 30)
    @NotNull
    private String account;

    @Size(max = 100)
    private String address;

    @NotNull
    private LocalDate birthDate;

    @NotNull
    @Enumerated(STRING)
    private Gender gender;

    @NotNull
    @Enumerated(STRING)
    private MemberRole memberRole;

    @NotNull
    @Enumerated(STRING)
    private ActivateStatus activateStatus;

    @OneToMany(mappedBy = "child", cascade = ALL, orphanRemoval = true)
    private List<Family> children = new ArrayList<>();

    @OneToMany(mappedBy = "parent", cascade = ALL, orphanRemoval = true)
    private List<Family> parents = new ArrayList<>();

    @OneToMany(mappedBy = "firstFriend", cascade = ALL, orphanRemoval = true)
    private List<Friend> firstFriends = new ArrayList<>();

    @OneToMany(mappedBy = "secondFriend", cascade = ALL, orphanRemoval = true)
    private List<Friend> secondFriends = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = ALL, orphanRemoval = true)
    private List<Mission> writers = new ArrayList<>();

    @OneToMany(mappedBy = "challenger", cascade = ALL, orphanRemoval = true)
    private List<Mission> challengers = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = ALL, orphanRemoval = true)
    private List<Notification> receivers = new ArrayList<>();

    @OneToMany(mappedBy = "sender", cascade = ALL, orphanRemoval = true)
    private List<Notification> senders = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private ProfileImage profileImage;

    /**
     *  2023-09-03
     *  diary, diary_share, comment entity 추가 시 연관관계 맵핑 추가
     *  builder 추가
     */



}
