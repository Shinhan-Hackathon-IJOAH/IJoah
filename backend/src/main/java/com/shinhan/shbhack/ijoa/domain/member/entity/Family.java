package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Family extends BaseEntity {

    @Id
    @Column(name = "family_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "child_id")
    private Member child;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "parent_id")
    private Member parent;

    @Builder
    public Family(Long id, Member child, Member parent) {
        this.id = id;
        this.child = child;
        this.parent = parent;
    }

    public static Family of(Member parent, Member child){
        return Family.builder()
                .parent(parent)
                .child(child)
                .build();
    }


}
