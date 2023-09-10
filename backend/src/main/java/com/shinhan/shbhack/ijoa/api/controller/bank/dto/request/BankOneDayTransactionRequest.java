package com.shinhan.shbhack.ijoa.api.controller.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class BankOneDayTransactionRequest {
    String accountNumber;
    LocalDate date;

}
