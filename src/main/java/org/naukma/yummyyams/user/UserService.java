package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.security.exception.IdNotNullException;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;
import org.naukma.yummyyams.utils.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find user by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class UserService extends BaseService<UserEntity, UserCreateUpdateDto, Integer> {
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

    public Integer create(UserCreateUpdateDto view, MultipartFile photo) {
        UserEntity entity = mapper.mergeCreate(view);
        preCreate(entity, view);
        UserEntity saved = repository.save(entity);
        if (photo != null)
            ImageService.saveImage(photo, saved);
        return saved.getId();
    }

    public Boolean update(UserCreateUpdateDto view, MultipartFile photo) {
        if (view.getId() == null) throw new IdNotNullException();
        UserEntity entity = getById(view.getId());
        mapper.mergeUpdate(entity, view);
        preUpdate(entity, view);
        repository.save(entity);
        if (photo != null)
            ImageService.saveImage(photo, entity);
        return true;
    }
}
