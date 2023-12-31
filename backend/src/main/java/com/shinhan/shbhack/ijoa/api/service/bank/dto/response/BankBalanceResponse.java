package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class BankBalanceResponse {
    String accountNumber;
    Long balance;
}
