package com.shinhan.shbhack.ijoa.domain.bank.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class Transaction {
    @Id
    @Column(name="transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long transactionId;

    @NotNull
    Integer transactionType;

    @NotNull
    String accountNumber;

    @NotNull
    LocalDate transactionDay;

    @NotNull
    LocalTime transactionTime;

    @ColumnDefault("0")
    Long withdrawAmount;

    @ColumnDefault("0")
    Long depositAmount;

    @ColumnDefault("0")
    Long balance;

    @NotNull
    Integer category;

    @NotNull
    String content;

    @Builder
    public Transaction(Long transactionId, Integer transactionType, String accountNumber, LocalDate transactionDay, LocalTime transactionTime, Long withdrawAmount, Long depositAmount, Long balance, Integer category, String content) {
        this.transactionId = transactionId;
        this.transactionType = transactionType;
        this.accountNumber = accountNumber;
        this.transactionDay = transactionDay;
        this.transactionTime = transactionTime;
        this.withdrawAmount = withdrawAmount;
        this.depositAmount = depositAmount;
        this.balance = balance;
        this.category = category;
        this.content = content;
    }
}
