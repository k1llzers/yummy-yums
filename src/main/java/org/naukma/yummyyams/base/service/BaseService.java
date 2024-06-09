package org.naukma.yummyyams.base.service;

import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.GettableById;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.security.exception.IdNotNullException;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public abstract class BaseService<E extends GettableById<I>, V extends GettableById<I>, I> implements Service<E, V, I> {
    private static final Logger log = LoggerFactory.getLogger(BaseService.class);
    @Autowired
    protected JpaRepository<E, I> repository;
    @Autowired
    protected Mapper<E, V> mapper;

    @Override
    @Transactional
    public I createReturnId(V view) {
        return createReturnEntity(view).getId();
    }

    @Override
    @Transactional
    public E createReturnEntity(V view) {
        E entity = mapper.mergeCreate(view);
        preCreate(entity, view);
        return repository.save(entity);
    }

    @Override
    @Transactional
    public Boolean update(V view) {
        if (view.getId() == null) throw new IdNotNullException();
        E entity = getById(view.getId());
        mapper.mergeUpdate(entity, view);
        preUpdate(entity, view);
        repository.save(entity);
        return true;
    }

    @Override
    @Transactional
    public Boolean delete(I id) {
        preDelete(id);
        repository.deleteById(id);
        log.info("We delete id: " + id);
        return true;
    }

    @Override
    @Transactional
    public E getById(I id) {
        return repository.findById(id).orElseThrow(
                () -> new NoSuchEntityException(getEntityNotFoundException(id))
        );
    }

    @Override
    @Transactional
    public List<E> getAllEntities() {
        return repository.findAll();
    }

    public <T> T getResponseDto(I id) {
        return mapper.toResponseDto(getById(id));
    }

    private String getEntityNotFoundException(I id) {
        EntityNotFoundMessage annotation = this.getClass().getAnnotation(EntityNotFoundMessage.class);
        return annotation != null ? annotation.errorMessage() + id : "Entity not found";
    }

    protected void preCreate(E entity, V view) {}

    protected void preUpdate(E entity, V view) {}

    protected void preDelete(I id) {}
}
