package com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, Long> {
}
