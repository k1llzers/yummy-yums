package org.naukma.yummyyams.family;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyRequestDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
import org.naukma.yummyyams.product.ProductEntity;
import org.naukma.yummyyams.product.ProductService;
import org.naukma.yummyyams.product.dto.ProductDto;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.user.UserEntity;
import org.naukma.yummyyams.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@EntityNotFoundMessage(errorMessage = "Can`t find family by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class FamilyService extends BaseService<FamilyEntity, FamilyCreateUpdateDto, Integer> {
    private static final String MY_LIST_NAME = "Мій список";

    private final UserService userService;
    private final ProductService productService;

    @PostConstruct
    public void init() {
        userService.setFamilyService(this);
    }

    public Integer createMySelfList(UserEntity user) {
        FamilyEntity createdUserList = FamilyEntity.builder()
                .name(MY_LIST_NAME)
                .participants(List.of(user))
                .build();
        return repository.save(createdUserList).getId();
    }

    public Map<ProductDto, Integer> addToList(Integer productId, Integer familyId) {
        FamilyEntity family = getById(familyId);
        Map<ProductEntity, Integer> familyProducts = family.getProducts();
        ProductEntity product = productService.getById(productId);
        familyProducts.put(product, familyProducts.getOrDefault(product, 0) + 1);
        repository.save(family);
        return ((FamilyMapper) mapper).toProductListResponse(familyProducts);
    }

    public Map<ProductDto, Integer> removeFromList(Integer productId, Integer familyId) {
        FamilyEntity family = getById(familyId);
        Map<ProductEntity, Integer> familyProducts = family.getProducts();
        ProductEntity product = productService.getById(productId);
        Integer count = familyProducts.get(product) - 1;
        if (count <= 0)
            familyProducts.remove(product);
        else
            familyProducts.put(product, count);
        repository.save(family);
        return ((FamilyMapper) mapper).toProductListResponse(familyProducts);
    }

    public Map<ProductDto, Integer> getFamilyList(Integer familyId) {
        FamilyEntity family = getById(familyId);
        return ((FamilyMapper) mapper).toProductListResponse(family.getProducts());
    }

    public Boolean sendRequest(Integer familyId, String userEmail) {
        FamilyEntity familyToRequest = getById(familyId);
        UserEntity toRequest = userService.getByEmail(userEmail);
        familyToRequest.getRequests().add(toRequest);
        repository.save(familyToRequest);
        return true;
    }

    public Boolean confirmRequest(Integer familyId) {
        FamilyEntity familyToRequest = getById(familyId);
        UserEntity toConfirm = SecurityContextAccessor.getUser();
        familyToRequest.getRequests().remove(toConfirm);
        familyToRequest.getParticipants().add(toConfirm);
        repository.save(familyToRequest);
        return true;
    }

    public Boolean cancelRequest(Integer familyId) {
        FamilyEntity familyToRequest = getById(familyId);
        UserEntity toCancel = SecurityContextAccessor.getUser();
        familyToRequest.getRequests().remove(toCancel);
        repository.save(familyToRequest);
        return true;
    }

    public List<FamilyRequestDto> getMyRequests() {
        return ((FamilyMapper)mapper).toFamilyRequestDtoList(((FamilyRepository) repository).findAllByRequestsContains(SecurityContextAccessor.getUser()));
    }

    public List<FamilyResponseDto> getMyFamilies() {
        return ((FamilyMapper)mapper).toResponseDtoList(((FamilyRepository) repository).findAllByParticipantsContains(SecurityContextAccessor.getUser()));
    }
}
