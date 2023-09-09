package com.shinhan.shbhack.ijoa.api.controller.bank;

import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankBalanceRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransactionRequest;
import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransferRequest;
import com.shinhan.shbhack.ijoa.api.controller.diary.dto.request.DiaryCreateRequest;
import com.shinhan.shbhack.ijoa.api.service.bank.command.BankService;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankAccountResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankBalanceResponse;
import com.shinhan.shbhack.ijoa.api.service.bank.dto.response.BankTransferResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/bank")
@RequiredArgsConstructor
public class BankController {
    private final BankService bankService;
    @PostMapping("/transactions")
    public ResponseEntity<?> checkTransactions(@RequestBody BankTransactionRequest bankTransactionRequest){
        BankAccountResponse bankAccountResponse = bankService.transactions(bankTransactionRequest);
        return new ResponseEntity<>(bankAccountResponse,HttpStatus.OK);
    }

    @PostMapping("/balance")
    public ResponseEntity<?> checkBalance(@RequestBody BankBalanceRequest bankBalanceRequest){
        BankBalanceResponse bankBalanceResponse = bankService.checkBalance(bankBalanceRequest);
        return new ResponseEntity<>(bankBalanceResponse,HttpStatus.OK);
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transferMoney(@RequestBody BankTransferRequest bankTransferRequest){
        BankTransferResponse bankTransferResponse = bankService.transfer(bankTransferRequest);
        return new ResponseEntity<>(bankTransferResponse, HttpStatus.OK);
    }
}
