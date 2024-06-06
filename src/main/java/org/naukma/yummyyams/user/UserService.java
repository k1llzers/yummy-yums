package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@EntityNotFoundMessage(errorMessage = "Can`t find user by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class UserService extends BaseService<UserEntity, UserCreateUpdateDto, Integer> {
    public UserResponse getMyselfInfo() {
        return mapper.toResponseDto(SecurityContextAccessor.getUser());
    }

    public UserEntity getByEmail(String email) {
        return ((UserRepository) repository).findByEmail(email).orElseThrow(
                () -> new NoSuchEntityException("Can`t find user by email: " + email)
        );
    }
}
