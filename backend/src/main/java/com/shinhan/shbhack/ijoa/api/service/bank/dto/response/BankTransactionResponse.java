package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class BankTransactionResponse {
    LocalDate date;
    LocalTime time;
    Long withdrawAmount;
    Long depositAmount;
    String content;
    Long transactionBalance;
    Integer type;
    Integer category;
}
