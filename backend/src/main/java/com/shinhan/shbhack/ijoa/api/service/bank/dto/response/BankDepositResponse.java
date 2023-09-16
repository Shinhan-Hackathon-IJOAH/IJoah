package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class BankDepositResponse {
    String depositAccountNumber;
    Long balance;
    public static BankDepositResponse of(String accountNumber,Long newBalance){
        BankDepositResponse bankDepositResponse = new BankDepositResponse();
        bankDepositResponse.depositAccountNumber = accountNumber;
        bankDepositResponse.balance = newBalance;
        return bankDepositResponse;
    }
}
