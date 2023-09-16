package com.shinhan.shbhack.ijoa.domain.bank.entity;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class Account {

    @Id
    @Column(name="account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long accountId;

    @NotNull
    String name;

    @NotNull
    Long balance;

    @NotNull
    @Column(unique = true)
    String accountNumber;

    @OneToOne(fetch = LAZY, mappedBy = "account", cascade = ALL, orphanRemoval = true)
    private Member member;


    @Builder
    public Account(Long accountId, String name, Long balance, String accountNumber) {
        this.accountId = accountId;
        this.name = name;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                ", accountNumber='" + accountNumber + '\'' +
                ", member=" + member +
                '}';
    }
}
