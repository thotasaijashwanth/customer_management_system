package com.cms.customermanagement.service;

import com.cms.customermanagement.dto.CustomerDTO;

import java.util.List;

/**
 * Service layer contract defining business operations available for
 * managing Customer records.
 */
public interface CustomerService {

    CustomerDTO createCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    CustomerDTO getCustomerById(Long id);

    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);

    void deleteCustomer(Long id);

    List<CustomerDTO> searchCustomersByName(String name);
}
