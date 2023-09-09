package com.shinhan.shbhack.ijoa.domain.bank.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankAccountResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankBalanceResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankDepositResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankTransactionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.shinhan.shbhack.ijoa.domain.bank.entity.QAccount.account;
import static com.shinhan.shbhack.ijoa.domain.bank.entity.QTransaction.transaction;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TransactionQueryRepository {
    private final JPAQueryFactory queryFactory;

    public BankAccountResponse findInfoByAccount(String accountNumber){
        return queryFactory.select(Projections.fields(BankAccountResponse.class, account.accountNumber, account.balance, account.name))
                .from(account).where(account.accountNumber.eq(accountNumber)).fetchOne();
    }

    public List<BankTransactionResponse> findDetailByAccount(String accountNumber){
        return queryFactory.select(Projections.fields(BankTransactionResponse.class,
                transaction.transactionDay.as("date"), transaction.transactionTime.as("time"),
                transaction.withdrawAmount, transaction.depositAmount, transaction.content, transaction.balance.as("transactionBalance"), transaction.category,
                        transaction.transactionType.as("type")))
                .from(transaction).where(transaction.accountNumber.eq(accountNumber)).fetch();
    }

    public BankBalanceResponse findBalanceByAccount(String accountNumber){
        return queryFactory.select(Projections.fields(BankBalanceResponse.class, account.accountNumber,account.balance)).from(account)
                .where(account.accountNumber.eq(accountNumber)).fetchOne();
    }

    public void updateBalanceByAccount(String accountNumber, Long balance){
        queryFactory.update(account).set(account.balance, balance).where(account.accountNumber.eq(accountNumber)).execute();
    }

}
