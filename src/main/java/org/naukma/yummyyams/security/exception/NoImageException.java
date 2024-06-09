package org.naukma.yummyyams.security.exception;

public class NoImageException extends RuntimeException {
    public NoImageException() {
        super();
    }

    public NoImageException(String message) {
        super(message);
    }

    public NoImageException(String message, Throwable cause) {
        super(message, cause);
    }
}
