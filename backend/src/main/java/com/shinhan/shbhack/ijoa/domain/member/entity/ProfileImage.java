package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Embedded
    private UploadFile uploadFile;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public ProfileImage(Long id, UploadFile uploadFile, Member member) {
        this.id = id;
        this.uploadFile = uploadFile;
        this.member = member;
    }



}
