package org.naukma.yummyyams.security;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.naukma.yummyyams.security.dto.ErrorResponse;
import org.naukma.yummyyams.security.exception.NoImageException;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler({NoSuchEntityException.class, MethodArgumentNotValidException.class, ValidationException.class})
    public ResponseEntity<ErrorResponse> handleNoSuchEntityException(Exception e) {
        return ResponseEntity.ok(new ErrorResponse(e.getMessage(), HttpStatus.CONFLICT.value()));
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.ok(new ErrorResponse("Не вірний email або пароль", HttpStatus.CONFLICT.value()));
    }

    @ExceptionHandler({NoImageException.class})
    public ResponseEntity<ErrorResponse> handleNoImageException(NoImageException e) {
        return ResponseEntity.ok(new ErrorResponse("Неможливо звантажити фото", HttpStatus.NO_CONTENT.value()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedException(Exception e) {
        log.error("Handle unexpected exception", e);
        return ResponseEntity.ok(new ErrorResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
}
