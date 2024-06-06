package org.naukma.yummyyams.family;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.user.UserEntity;
import org.naukma.yummyyams.user.UserRepository;
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
    private final UserService userService;

    public List<FamilyResponseDto> getMyFamilies() {
        return ((FamilyMapper)mapper).toResponseDtoList(((FamilyRepository) repository).findAllByParticipantsContains(SecurityContextAccessor.getUser()));
    }
}
