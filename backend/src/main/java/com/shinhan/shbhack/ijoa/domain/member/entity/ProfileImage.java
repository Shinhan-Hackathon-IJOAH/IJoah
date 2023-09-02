package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ProfileImage extends BaseEntity {

    @Id
    @Column(name = "profile_image_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;


    /**
     * 2023-09-03
     * common util file ** 내용 추가
     * 주석 해제
     */
//    @Embedded
//    private UploadFile uploadFile;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    /**
     *  2023-09-03
     *  builder 추가
     */


}
