package com.shinhan.shbhack.ijoa.api.service.bank.command;

import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankBalanceRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankDepositRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransactionRequest;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankAccountResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankBalanceResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankTransactionResponse;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.query.TransactionQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BankService {
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionQueryRepository transactionQueryRepository;

    public void deposit(BankDepositRequest bankDepositRequest){

    }

    public void transfer(){

    }

    public BankBalanceResponse checkBalance(BankBalanceRequest bankBalanceRequest){
        BankBalanceResponse bankBalanceResponse = transactionQueryRepository.findBalanceByAccount(bankBalanceRequest.getAccountNumber());
        return bankBalanceResponse;
    }

    public BankAccountResponse transactions(BankTransactionRequest bankTransactionRequest){
        BankAccountResponse bankAccountResponse = transactionQueryRepository.findInfoByAccount(bankTransactionRequest.getAccountNumber());
        List<BankTransactionResponse> bankTransactionResponseList = transactionQueryRepository.findDetailByAccount(bankAccountResponse.getAccountNumber());
        bankAccountResponse.setBankTransactionResponses(bankTransactionResponseList);
        return bankAccountResponse;
    }

    public void startOneWonAuth(){

    }

    public void checkOneWonAuth(){

    }
}
