package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransferRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class BankTransferResponse {
    String withdrawAccount;
    String depositAccount;
    Long amount;
    String withdrawContent;
    String depositContent;
    Long balance;

    public static BankTransferResponse of(BankTransferRequest request, Long newBalnace){
        BankTransferResponse bankTransferResponse = new BankTransferResponse();
        bankTransferResponse.withdrawAccount = request.getWithdrawAccount();
        bankTransferResponse.depositAccount = request.getDepositAccount();
        bankTransferResponse.amount = Long.parseLong(request.getAmount());
        bankTransferResponse.withdrawContent = request.getWithdrawContent();
        bankTransferResponse.depositContent = request.getDepositContent();
        bankTransferResponse.balance = newBalnace;
        return bankTransferResponse;
    }
}
