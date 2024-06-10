package org.naukma.yummyyams.family;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyRequestDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
import org.naukma.yummyyams.product.dto.ProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/family")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FamilyController {
    private final FamilyService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody FamilyCreateUpdateDto body) {
        return ResponseEntity.ok(service.createReturnId(body));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody FamilyCreateUpdateDto body) {
        return ResponseEntity.ok(service.update(body));
    }

    @PutMapping("/leave/{familyId}")
    public ResponseEntity<Boolean> leaveFromFamily(@PathVariable Integer familyId) {
        return ResponseEntity.ok(service.leaveFromFamily(familyId));
    }

    @PutMapping("/send-request/{familyId}/{userEmail}")
    public ResponseEntity<Boolean> sendRequestToFamily(@PathVariable Integer familyId, @PathVariable String userEmail) {
        return ResponseEntity.ok(service.sendRequest(familyId, userEmail));
    }

    @PutMapping("/confirm-request/{familyId}")
    public ResponseEntity<Boolean> confirmRequest(@PathVariable Integer familyId) {
        return ResponseEntity.ok(service.confirmRequest(familyId));
    }

    @PutMapping("/cancel-request/{familyId}")
    public ResponseEntity<Boolean> rejectRequest(@PathVariable Integer familyId) {
        return ResponseEntity.ok(service.cancelRequest(familyId));
    }

    @PutMapping("/increase-count/{productId}/{familyId}")
    public ResponseEntity<Map<ProductDto, Integer>> increaseCount(@PathVariable Integer familyId, @PathVariable Integer productId) {
        return ResponseEntity.ok(service.increaseCount(productId, familyId));
    }

    @PutMapping("/decrease-count/{productId}/{familyId}")
    public ResponseEntity<Map<ProductDto, Integer>> decreaseCount(@PathVariable Integer familyId, @PathVariable Integer productId) {
        return ResponseEntity.ok(service.decreaseCount(productId, familyId));
    }

    @PutMapping("/delete-product/{productId}/{familyId}")
    public ResponseEntity<Map<ProductDto, Integer>> removeProduct(@PathVariable Integer familyId, @PathVariable Integer productId) {
        return ResponseEntity.ok(service.deleteFromList(productId, familyId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FamilyResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping("/my-families")
    public ResponseEntity<List<FamilyResponseDto>> getByParticipantId() {
        return ResponseEntity.ok(service.getMyFamilies());
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<FamilyRequestDto>> getMyRequests() {
        return ResponseEntity.ok(service.getMyRequests());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<Map<ProductDto, Integer>> getFamilyList(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getFamilyList(id));
    }
}
