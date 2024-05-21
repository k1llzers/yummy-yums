package org.naukma.yummyyams.security.exception;

public class IdNotNullException extends RuntimeException {
    public IdNotNullException() {
        super("Id cant be null");
    }

    public IdNotNullException(String message) {
        super(message);
    }

    public IdNotNullException(String message, Throwable cause) {
        super(message, cause);
    }
}
