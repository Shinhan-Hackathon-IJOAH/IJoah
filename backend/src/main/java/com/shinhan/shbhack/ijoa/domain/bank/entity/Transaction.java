package com.shinhan.shbhack.ijoa.domain.bank.entity;

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
}
