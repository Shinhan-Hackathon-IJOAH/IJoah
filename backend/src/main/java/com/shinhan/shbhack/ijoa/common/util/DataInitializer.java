package com.shinhan.shbhack.ijoa.common.util;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
import com.shinhan.shbhack.ijoa.domain.bank.entity.TransactionCategory;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionCategoryRepository;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.TransactionRepository;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String pwd = "1Q2w3e4r!";

        Member member = Member.builder()
                .email("byuri1356@gmail1.com")
                .name("유승민")
                .password(bCryptPasswordEncoder.encode(pwd))
                .account("944500-00-000000")
                .address("address")
                .phoneNumber("010-9814-1356")
                .gender(Gender.MALE)
                .memberRole(MemberRole.PARENT)
                .activateStatus(ActivateStatus.ACTIVATE)
                .birthDate(LocalDate.of(1997, 7, 29))
                .build();

        memberRepository.save(member);
        bank();
    }
    public void bank() throws Exception{

        category();
        account_01();
        account_02("110222333333");
    }
    public void category() throws Exception{

        TransactionCategory category_01 = TransactionCategory.builder()
                .id(1)
                .name("쇼핑")
                .build();
        TransactionCategory category_02 = TransactionCategory.builder()
                .id(2)
                .name("편의점·마트·잡화")
                .build();
        TransactionCategory category_03 = TransactionCategory.builder()
                .id(3)
                .name("이체")
                .build();
        TransactionCategory category_04 = TransactionCategory.builder()
                .id(4)
                .name("교통")
                .build();
        TransactionCategory category_05 = TransactionCategory.builder()
                .id(5)
                .name("취미")
                .build();
        TransactionCategory category_06 = TransactionCategory.builder()
                .id(6)
                .name("카페·간식")
                .build();
        TransactionCategory category_07 = TransactionCategory.builder()
                .id(7)
                .name("식비")
                .build();
        TransactionCategory category_08 = TransactionCategory.builder()
                .id(8)
                .name("출금")
                .build();


        transactionCategoryRepository.save(category_01);
        transactionCategoryRepository.save(category_02);
        transactionCategoryRepository.save(category_03);
        transactionCategoryRepository.save(category_04);
        transactionCategoryRepository.save(category_05);
        transactionCategoryRepository.save(category_06);
        transactionCategoryRepository.save(category_07);
        transactionCategoryRepository.save(category_08);
    }
    public void account_01() throws Exception{
        Account account = Account.builder()
                .accountNumber("110111222222")
                .balance(Long.parseLong("100000"))
                .name("김신한")
                .build();
        Transaction transaction_01 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,1))
                .transactionTime(LocalTime.of(14,20))
                .accountNumber("110111222222")
                .transactionType(1)
                .content("엄마 용돈")
                .balance(Long.parseLong("1300000"))
                .depositAmount(Long.parseLong("30000"))
                .withdrawAmount(Long.parseLong("0"))
                .category(3)
                .build();
        Transaction transaction_02 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,2))
                .transactionTime(LocalTime.of(14,25))
                .accountNumber("110111222222")
                .transactionType(2)
                .content("다이소")
                .balance(Long.parseLong("1200000"))
                .depositAmount(Long.parseLong("0"))
                .withdrawAmount(Long.parseLong("10000"))
                .category(2)
                .build();
        Transaction transaction_03 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,3))
                .transactionTime(LocalTime.of(17,20))
                .accountNumber("110111222222")
                .transactionType(2)
                .content("출금")
                .balance(Long.parseLong("1000000"))
                .depositAmount(Long.parseLong("20000"))
                .withdrawAmount(Long.parseLong("0"))
                .category(8)
                .build();
        accountRepository.save(account);

        transactionRepository.save(transaction_01);
        transactionRepository.save(transaction_02);
        transactionRepository.save(transaction_03);

    }
    public void account_02(String accountNumber) throws Exception{
        Account account = Account.builder()
                .accountNumber(accountNumber)
                .balance(Long.parseLong("100000"))
                .name("김쏠쏠")
                .build();
        Transaction transaction_01 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,1))
                .transactionTime(LocalTime.of(14,20))
                .accountNumber(accountNumber)
                .transactionType(1)
                .content("엄마 용돈")
                .balance(Long.parseLong("1300000"))
                .depositAmount(Long.parseLong("30000"))
                .withdrawAmount(Long.parseLong("0"))
                .category(3)
                .build();
        Transaction transaction_02 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,2))
                .transactionTime(LocalTime.of(14,25))
                .accountNumber(accountNumber)
                .transactionType(2)
                .content("다이소")
                .balance(Long.parseLong("1200000"))
                .depositAmount(Long.parseLong("0"))
                .withdrawAmount(Long.parseLong("10000"))
                .category(2)
                .build();
        Transaction transaction_03 = Transaction.builder()
                .transactionDay(LocalDate.of(2023,9,3))
                .transactionTime(LocalTime.of(17,20))
                .accountNumber(accountNumber)
                .transactionType(2)
                .content("출금")
                .balance(Long.parseLong("1000000"))
                .depositAmount(Long.parseLong("20000"))
                .withdrawAmount(Long.parseLong("0"))
                .category(8)
                .build();
        accountRepository.save(account);

        transactionRepository.save(transaction_01);
        transactionRepository.save(transaction_02);
        transactionRepository.save(transaction_03);

    }
}
