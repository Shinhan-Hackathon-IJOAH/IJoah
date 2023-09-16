package com.shinhan.shbhack.ijoa.api.controller.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class BankTransferRequest {
    String withdrawAccount;
    String depositAccount;
    String amount;
    String withdrawContent;
    String depositContent;
}
