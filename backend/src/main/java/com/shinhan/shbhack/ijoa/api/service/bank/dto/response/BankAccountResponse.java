package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = PUBLIC)
public class BankAccountResponse {
    String accountNumber;
    Long balance;
    String name;
    List<BankTransactionResponse> bankTransactionResponses;

}
