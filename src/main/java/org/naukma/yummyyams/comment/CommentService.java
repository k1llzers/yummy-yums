package org.naukma.yummyyams.comment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.comment.dto.CommentCreateUpdateDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@EntityNotFoundMessage(errorMessage = "Can`t find comment by id: ")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class CommentService extends BaseService<CommentEntity, CommentCreateUpdateDto, Integer> {
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    @Override
    protected void preCreate(CommentEntity entity, CommentCreateUpdateDto view) {
        if (view.getReplyToId() != null) {
            repository.findAll();
            entity.setReplyTo(getById(view.getReplyToId()));
        }
    }

    @Override
    protected void preDelete(Integer id) {
        repository.findAll();
        CommentEntity byId = getById(id);
        if (byId.getReplyTo() == null) return;
        CommentEntity replyTo = byId.getReplyTo();
        replyTo.getReplies().remove(byId);
        repository.save(replyTo);
    }
}
