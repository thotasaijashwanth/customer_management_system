package com.cms.customermanagement.exception;

/**
 * Thrown when an attempt is made to create a resource that would violate
 * a uniqueness constraint (e.g. a Customer with an email that already exists).
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
