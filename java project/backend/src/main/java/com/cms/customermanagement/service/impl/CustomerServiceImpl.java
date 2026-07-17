package com.cms.customermanagement.service.impl;

import com.cms.customermanagement.dto.CustomerDTO;
import com.cms.customermanagement.entity.Customer;
import com.cms.customermanagement.exception.DuplicateResourceException;
import com.cms.customermanagement.exception.ResourceNotFoundException;
import com.cms.customermanagement.repository.CustomerRepository;
import com.cms.customermanagement.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of {@link CustomerService} containing the business logic
 * for creating, reading, updating, deleting, and searching Customer records.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        log.info("Creating new customer with email: {}", customerDTO.getEmail());

        if (customerRepository.existsByEmailIgnoreCase(customerDTO.getEmail())) {
            throw new DuplicateResourceException(
                    "A customer already exists with email: " + customerDTO.getEmail());
        }

        Customer customer = mapToEntity(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);

        log.info("Customer created successfully with id: {}", savedCustomer.getId());
        return mapToDTO(savedCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerDTO> getAllCustomers() {
        log.info("Fetching all customers");
        return customerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerDTO getCustomerById(Long id) {
        log.info("Fetching customer with id: {}", id);
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));
        return mapToDTO(customer);
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        log.info("Updating customer with id: {}", id);

        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));

        // If email is being changed, ensure the new email isn't already taken by another customer
        if (!existingCustomer.getEmail().equalsIgnoreCase(customerDTO.getEmail())
                && customerRepository.existsByEmailIgnoreCase(customerDTO.getEmail())) {
            throw new DuplicateResourceException(
                    "A customer already exists with email: " + customerDTO.getEmail());
        }

        existingCustomer.setCustomerName(customerDTO.getCustomerName());
        existingCustomer.setEmail(customerDTO.getEmail());
        existingCustomer.setPhone(customerDTO.getPhone());
        existingCustomer.setCity(customerDTO.getCity());

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        log.info("Customer with id: {} updated successfully", id);

        return mapToDTO(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        log.info("Deleting customer with id: {}", id);
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));
        customerRepository.delete(customer);
        log.info("Customer with id: {} deleted successfully", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerDTO> searchCustomersByName(String name) {
        log.info("Searching customers by name containing: {}", name);
        return customerRepository.findByCustomerNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ---------- Mapping helpers ----------

    private Customer mapToEntity(CustomerDTO dto) {
        return Customer.builder()
                .id(dto.getId())
                .customerName(dto.getCustomerName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .city(dto.getCity())
                .build();
    }

    private CustomerDTO mapToDTO(Customer customer) {
        return CustomerDTO.builder()
                .id(customer.getId())
                .customerName(customer.getCustomerName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .city(customer.getCity())
                .build();
    }
}
