package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.StoragableService;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;
import org.naukma.yummyyams.utils.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find user by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class UserService extends StoragableService<UserEntity, UserCreateUpdateDto, Integer> {
    public UserResponse getMyselfInfo() {
        return mapper.toResponseDto(SecurityContextAccessor.getUser());
    }

    public Resource getPhoto(Integer id) {
        return ImageService.getPhoto(getById(id));
    }

    public UserEntity getByEmail(String email) {
        return ((UserRepository) repository).findByEmail(email).orElseThrow(
                () -> new NoSuchEntityException("Can`t find user by email: " + email)
        );
    }

    public List<UserShortResponse> getUsersByRestrict(String restrict) {
        return ((UserMapper) mapper).toShortResponseDtoList(((UserRepository) repository).findAllByRestrict(restrict));
    }
}
