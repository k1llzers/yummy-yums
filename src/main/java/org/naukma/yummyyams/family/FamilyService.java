package org.naukma.yummyyams.family;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyRequestDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.user.UserEntity;
import org.naukma.yummyyams.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find family by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class FamilyService extends BaseService<FamilyEntity, FamilyCreateUpdateDto, Integer> {
    private static final String MY_LIST_NAME = "Мій список";

    private final UserService userService;

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
