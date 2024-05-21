package org.naukma.yummyyams.family;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@EntityNotFoundMessage(errorMessage = "Can`t find family by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class FamilyService extends BaseService<FamilyEntity, FamilyCreateUpdateDto, Integer> {
}
