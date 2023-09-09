package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import com.querydsl.core.Tuple;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class BankAnalyzeListResponse {
    Integer categoryId;
    Long amount;
    public static BankAnalyzeListResponse of(Tuple tuple){
        BankAnalyzeListResponse bankAnalyzeListResponse = new BankAnalyzeListResponse();
        bankAnalyzeListResponse.categoryId = tuple.get(0, Integer.class);
        bankAnalyzeListResponse.amount = tuple.get(1, Long.class);
        return bankAnalyzeListResponse;
    }
}
