package org.naukma.yummyyams.security;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.naukma.yummyyams.security.dto.ErrorResponse;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

//    @ExceptionHandler({NoSuchEntityException.class, MethodArgumentNotValidException.class, ValidationException.class})
//    public ResponseEntity<ErrorResponse> handleNoSuchEntityException(Exception e) {
//        return ResponseEntity.ok(new ErrorResponse(e.getMessage(), HttpStatus.CONFLICT.value()));
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorResponse> handleUnexpectedException(Exception e) {
//        return ResponseEntity.ok(new ErrorResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
//    }
}
