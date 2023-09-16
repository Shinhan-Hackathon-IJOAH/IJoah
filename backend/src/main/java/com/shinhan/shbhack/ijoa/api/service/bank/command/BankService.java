package com.shinhan.shbhack.ijoa.api.service.bank.command;

import com.querydsl.core.Tuple;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.*;
import com.shinhan.shbhack.ijoa.api.service.alarm.command.AlarmService;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.*;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.query.TransactionQueryRepository;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BankService {
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionQueryRepository transactionQueryRepository;
    private final MemberRepository memberRepository;
    private final AlarmService alarmService;
    private Map<String, String> checkOne = new ConcurrentHashMap<>();
    private List<String> list = new ArrayList<>();


    @PostConstruct
    public void init(){

        list.add("미하남영");
        list.add("미성남준");
        list.add("미승남민");
        list.add("미하남영");
        list.add("팀장하영");
        list.add("디장성준");
        list.add("프장지헌");
        list.add("백장승민");
    }

    public BankDepositResponse deposit(BankDepositRequest bankDepositRequest, String message){
        Account account =  accountRepository.findAccountByAccountNumber(bankDepositRequest.getDepositAccountNumber());
        Long balance = account.getBalance();
        balance += Long.parseLong(bankDepositRequest.getAmount());
        account.setBalance(balance);
        log.info("현재 시간 :" +LocalTime.now() );
        transactionRepository.save(Transaction.builder()
                .accountNumber(account.getAccountNumber())
                .transactionDay(LocalDate.now())
                .transactionTime(LocalTime.now())
                .balance(balance)
                .withdrawAmount(Long.parseLong("0"))
                .depositAmount(Long.parseLong(bankDepositRequest.getAmount()))
                .category(8)
                .transactionType(1)
                .content(message)
                .build()

        );
        return BankDepositResponse.of(account.getAccountNumber(), balance);
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
        log.info(bankTransferRequest.getWithdrawAccount());
        log.info(bankTransferRequest.getDepositAccount());

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
        if(senderMoney < Long.parseLong(bankTransferRequest.getAmount())){
            log.info(senderMoney.toString());
            log.info(bankTransferRequest.getAmount());
            throw new RuntimeException("잔액 초과");
        }else{
            log.info(senderMoney.toString());
            log.info(bankTransferRequest.getAmount());
        }
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

        Account receiverAccount = accountRepository.findAccountByAccountNumber(bankTransferRequest.getDepositAccount());
        Account senderAccount = accountRepository.findAccountByAccountNumber(bankTransferRequest.getWithdrawAccount());

        /* 알람 서비스 이용 */
        Member receiveMember = memberRepository.findByAccount(receiverAccount).get();
        Member sendMember =  memberRepository.findByAccount(senderAccount).get();
        String content = sendMember.getName()+"님이 "+bankTransferRequest.getAmount().toString()+"원을 이체했습니다. ";
        alarmService.sendAlarm(AlarmNotifyRequest.builder()
                .sender(sendMember)
                .receiver(receiveMember)
                .notificationType(NotificationType.WITHDRAWL)
                        .confirmStatus(ConfirmStatus.UNCONFIRMED)
                .content(content)
                .build());

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

    public BankAccountResponse oneDayTransactions(BankOneDayTransactionRequest transactionRequest){
        BankAccountResponse bankAccountResponse = transactionQueryRepository.findInfoByAccount(transactionRequest.getAccountNumber());
        List<BankTransactionResponse> bankTransactionResponseList = transactionQueryRepository.findDayDetailByAccount(transactionRequest.getAccountNumber(), transactionRequest.getDate());
        bankAccountResponse.setBankTransactionResponses(bankTransactionResponseList);
        return bankAccountResponse;
    }

    public void startOneWonAuth(BankBalanceRequest bankBalanceRequest){
        if(memberRepository.existsMemberByAccount_AccountNumber(bankBalanceRequest.getAccountNumber())){
            throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
        }
        Random random = new Random();
        int randomNumber = random.nextInt(list.size());
        if(checkOne.get(bankBalanceRequest.getAccountNumber()) !=null){
            checkOne.remove(bankBalanceRequest.getAccountNumber());
        }
        checkOne.put(bankBalanceRequest.getAccountNumber(), list.get(randomNumber));
        BankDepositRequest authRequest = new BankDepositRequest(bankBalanceRequest.getAccountNumber(),"1");
        this.deposit(authRequest, list.get(randomNumber));
    }

    public boolean checkOneWonAuth(BankAuthRequest bankAuthRequest){
        String secretMSG =checkOne.get(bankAuthRequest.getAccountNumber());
        if(secretMSG != null){
            if(secretMSG.equals(bankAuthRequest.getMessage())){
                Member user = memberRepository.findById(Long.parseLong(bankAuthRequest.getMemberId())).get();
                Account account = accountRepository.findAccountByAccountNumber(bankAuthRequest.getAccountNumber());
                user.changeAccount(account);
                checkOne.remove(bankAuthRequest.getAccountNumber());
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
    public BankAnalyzeResponse analyzeTransaction(String accountNumber){
//        List<Tuple> result = transactionQueryRepository.findListByAccount(accountNumber, LocalDate.now().minusDays(30));
//        List<BankAnalyzeListResponse> list = new ArrayList<>();
//        for (Tuple a : result){
//            list.add(BankAnalyzeListResponse.of(a));
//        }
        List<BankAnalyzeListResponse> bankAnalyzeListResponses = transactionQueryRepository.findListByAccount(accountNumber, LocalDate.now().minusDays(30));
        BankAnalyzeResponse bankAnalyzeResponse = transactionQueryRepository.calcSumByAccount(accountNumber, LocalDate.now().minusDays(30));
        bankAnalyzeResponse.setList(bankAnalyzeListResponses);
        return bankAnalyzeResponse;
    }
}
