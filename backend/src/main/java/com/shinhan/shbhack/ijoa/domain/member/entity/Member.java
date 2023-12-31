package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberModifyServiceRequest;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryShare;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reactor.util.annotation.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.*;
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

    @Email
    @Size(max = 40)
    @NotNull
    @Column(unique = true)
    // Todo: 2023-09-10: unique 속성 안먹는 이유 찾아야함
    private String email;

    @NotNull
    private String password;

    @Size(max = 20)
    @NotNull
    private String phoneNumber;

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

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Diary> diaries = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<DiaryShare> diaryShares = new ArrayList<>();

    @OneToOne(fetch = LAZY, mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private ProfileImage profileImage;

//    @OneToOne(fetch = LAZY, mappedBy = "member", cascade = ALL, orphanRemoval = true)
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "account_Id")
    private Account account;

    @Builder
    public Member(Long id, String name, String email, String password, String phoneNumber, LocalDate birthDate, Gender gender, MemberRole memberRole, ActivateStatus activateStatus, List<Family> children, List<Family> parents, List<Friend> firstFriends, List<Friend> secondFriends, List<Mission> writers, List<Mission> challengers, List<Notification> receivers, List<Notification> senders, List<Diary> diaries, List<DiaryShare> diaryShares, ProfileImage profileImage, Account account) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.memberRole = memberRole;
        this.activateStatus = activateStatus;
        this.children = children;
        this.parents = parents;
        this.firstFriends = firstFriends;
        this.secondFriends = secondFriends;
        this.writers = writers;
        this.challengers = challengers;
        this.receivers = receivers;
        this.senders = senders;
        this.diaries = diaries;
        this.diaryShares = diaryShares;
        this.profileImage = profileImage;
        this.account = account;
    }

    public void update(String password){
            this.password = password;
    }

    public void changeAccount(Account account){
        this.account = account;
    }
}
