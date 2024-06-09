package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.StoragableService;
import org.naukma.yummyyams.family.FamilyService;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find user by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class UserService extends StoragableService<UserEntity, UserCreateUpdateDto, Integer> {
    private final FamilyService familyService;

    public UserResponse getMyselfInfo() {
        return mapper.toResponseDto(SecurityContextAccessor.getUser());
    }

    @Override
    public Integer createReturnId(UserCreateUpdateDto view, MultipartFile photo) {
        UserEntity createdUser = createReturnEntity(view, photo);
        familyService.createMySelfList(createdUser);
        return createdUser.getId();
    }

    public UserEntity getByEmail(String email) {
        return ((UserRepository) repository).findByEmail(email).orElseThrow(
                () -> new NoSuchEntityException("Can`t find user by email: " + email)
        );
    }

    public List<UserShortResponse> getUsersByRestrict(String restrict) {
        List<UserEntity> allByRestrict = ((UserRepository) repository).findAllByRestrict("%" + restrict + "%");
        allByRestrict.remove(SecurityContextAccessor.getUser());
        return ((UserMapper) mapper).toShortResponseDtoList(allByRestrict);
    }
}
