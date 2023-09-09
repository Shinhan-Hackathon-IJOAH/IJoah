package com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.bank.entity.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, Integer> {
}
