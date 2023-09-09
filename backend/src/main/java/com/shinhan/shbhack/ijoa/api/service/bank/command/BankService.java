package com.shinhan.shbhack.ijoa.api.service.bank.command;

import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankBalanceRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankDepositRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransactionRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransferRequest;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankAccountResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankBalanceResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankTransactionResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankTransferResponse;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.query.TransactionQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
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

    synchronized public BankTransferResponse transfer(BankTransferRequest bankTransferRequest){
        /*
        1. 이체하는 사람 잔액 조회
        2. 이체받는 사람 잔액 조회
        3. 계산 빼주기 더하기
        3-1. 이체 내역 추가
        4. 이체하는 사람 돈 업데이트
        5. 이체받는 사람 돈 업데이트
         */

        Account sender =  accountRepository.findAccountByAccountNumber(bankTransferRequest.getWithdrawAccount());
        Account receiver =  accountRepository.findAccountByAccountNumber(bankTransferRequest.getDepositAccount());
        log.info(bankTransferRequest.getWithdrawAccount());
        log.info(bankTransferRequest.getDepositAccount());
//        BankBalanceResponse sender = transactionQueryRepository.findBalanceByAccount(bankTransferRequest.getWithdrawAccount());
//        BankBalanceResponse receiver = transactionQueryRepository.findBalanceByAccount(bankTransferRequest.getDepositAccount());
        Long senderMoney = sender.getBalance();
        String senderMSG = bankTransferRequest.getWithdrawContent();
        Long reciverMoney = receiver.getBalance();
        String receiverMSG = bankTransferRequest.getDepositContent();
        // 돈 계산
        senderMoney -= Long.parseLong(bankTransferRequest.getAmount());
        reciverMoney += Long.parseLong(bankTransferRequest.getAmount());
        // 이체하는 사람 내역 추가
        transactionRepository.save(Transaction.builder()
                        .accountNumber(sender.getAccountNumber())
                .transactionDay(LocalDate.now())
                .transactionTime(LocalTime.now())
                .balance(senderMoney)
                .withdrawAmount(Long.parseLong(bankTransferRequest.getAmount()))
                .depositAmount(Long.parseLong("0"))
                .category(3)
                .transactionType(2)
                .content(senderMSG)
                .build()

        );

        // 이체받는 사람 내역 추가
        transactionRepository.save(Transaction.builder()
                .accountNumber(receiver.getAccountNumber())
                .transactionDay(LocalDate.now())
                .transactionTime(LocalTime.now())
                .balance(reciverMoney)
                .withdrawAmount(Long.parseLong("0"))
                .depositAmount(Long.parseLong(bankTransferRequest.getAmount()))
                .category(3)
                .transactionType(1)
                .content(receiverMSG)
                .build()

        );
        //변경된 값 갱신
        sender.setBalance(senderMoney);
        receiver.setBalance(reciverMoney);
        return BankTransferResponse.of(bankTransferRequest, senderMoney);
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
