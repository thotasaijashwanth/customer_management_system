package com.cms.customermanagement.repository;

import com.cms.customermanagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository providing CRUD operations for Customer entity.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Finds customers whose name contains the given keyword, ignoring case.
     * Used to implement the "search customer by name" feature.
     */
    List<Customer> findByCustomerNameContainingIgnoreCase(String name);

    /**
     * Finds a customer by their unique email address.
     */
    Optional<Customer> findByEmailIgnoreCase(String email);

    /**
     * Checks whether a customer with the given email already exists.
     */
    boolean existsByEmailIgnoreCase(String email);
}
