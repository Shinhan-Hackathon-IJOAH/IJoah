package com.shinhan.shbhack.ijoa.api.service.bank.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@NoArgsConstructor(access = PUBLIC)
public class BankAnalyzeResponse {
    Long sum;
    List<BankAnalyzeListResponse> list;
}
