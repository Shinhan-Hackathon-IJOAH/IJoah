package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class BankAccountResponse {
    String accountNumber;
    Long balance;
    String name;
    List<BankTransactionResponse> bankTransactionResponses;

}
