package org.naukma.yummyyams.comment;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.comment.dto.CommentCreateUpdateDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class CommentService extends BaseService<CommentEntity, CommentCreateUpdateDto, Integer> {
}
