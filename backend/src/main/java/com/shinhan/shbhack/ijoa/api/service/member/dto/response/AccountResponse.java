package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class AccountResponse {

    Long accountId;

    String name;

    Long balance;

    String accountNumber;

    @Builder
    public AccountResponse(Long accountId, String name, Long balance, String accountNumber) {
        this.accountId = accountId;
        this.name = name;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }

    public static AccountResponse of(Account account){
        return AccountResponse.builder()
                .accountId(account.getAccountId())
                .name(account.getName())
                .balance(account.getBalance())
                .accountNumber(account.getAccountNumber())
                .build();
    }
}
