package com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
