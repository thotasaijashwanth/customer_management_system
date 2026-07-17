package com.cms.customermanagement.controller;

import com.cms.customermanagement.dto.ApiResponse;
import com.cms.customermanagement.dto.CustomerDTO;
import com.cms.customermanagement.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller exposing CRUD endpoints for managing Customer records.
 * Base path: /api/customers
 */
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
})
public class CustomerController {

    private final CustomerService customerService;

    /**
     * GET /api/customers
     * GET /api/customers?name=searchTerm
     * Retrieves all customers, or customers matching the given name if the
     * optional "name" query parameter is provided.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> getAllCustomers(
            @RequestParam(value = "name", required = false) String name) {

        List<CustomerDTO> customers = (name == null || name.isBlank())
                ? customerService.getAllCustomers()
                : customerService.searchCustomersByName(name);

        return ResponseEntity.ok(
                ApiResponse.success("Customers retrieved successfully", customers));
    }

    /**
     * GET /api/customers/{id}
     * Retrieves a single customer by their unique identifier.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerDTO>> getCustomerById(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Customer retrieved successfully", customer));
    }

    /**
     * POST /api/customers
     * Creates a new customer record.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerDTO>> createCustomer(
            @Valid @RequestBody CustomerDTO customerDTO) {

        CustomerDTO createdCustomer = customerService.createCustomer(customerDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Customer created successfully", createdCustomer));
    }

    /**
     * PUT /api/customers/{id}
     * Updates an existing customer record.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerDTO>> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerDTO customerDTO) {

        CustomerDTO updatedCustomer = customerService.updateCustomer(id, customerDTO);
        return ResponseEntity.ok(
                ApiResponse.success("Customer updated successfully", updatedCustomer));
    }

    /**
     * DELETE /api/customers/{id}
     * Deletes a customer record by id.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(
                ApiResponse.success("Customer deleted successfully", null));
    }
}
