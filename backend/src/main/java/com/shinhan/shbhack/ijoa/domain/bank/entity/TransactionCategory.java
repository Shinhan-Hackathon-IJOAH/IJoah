package com.shinhan.shbhack.ijoa.domain.bank.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class TransactionCategory {
    @Id
    @Column(name="transaction_category_id")
    Integer id;
    String name;
}
