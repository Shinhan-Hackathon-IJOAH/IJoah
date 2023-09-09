package com.shinhan.shbhack.ijoa.api.service.bank.command;

import com.shinhan.shbhack.ijoa.api.controller.bank.requestdto.BankBalanceRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.requestdto.BankDepositRequest;
import com.shinhan.shbhack.ijoa.domain.bank.entity.TransactionCategory;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BankService {
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public void deposit(BankDepositRequest bankDepositRequest){

    }

    public void transfer(){

    }

    public void checkBalance(BankBalanceRequest bankBalanceRequest){
//        accountRepository.
    }

    public void transactions(){

    }

    public void startOneWonAuth(){

    }

    public void checkOneWonAuth(){

    }
}
