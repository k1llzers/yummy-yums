package org.naukma.yummyyams.base.service;

import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.GettableById;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.security.exception.NoSuchEntityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseService<E extends GettableById<I>, V extends GettableById<I>, I> implements Service<E, V, I> {
    @Autowired
    protected JpaRepository<E, I> repository;
    @Autowired
    protected Mapper<E, V> mapper;

    @Override
    @Transactional
    public I save(V view) {
        E entity = mapper.mergeCreate(view);
        preCreate(entity, view);
        return repository.save(entity).getId();
    }

    @Override
    @Transactional
    public Boolean update(V view) {
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
        return true;
    }

    @Override
    public E getById(I id) {
        return repository.findById(id).orElseThrow(
                () -> new NoSuchEntityException(getEntityNotFoundException())
        );
    }

    public <T> T getResponseDto(I id) {
        return mapper.toResponseDto(getById(id));
    }

    private String getEntityNotFoundException() {
        EntityNotFoundMessage annotation = this.getClass().getAnnotation(EntityNotFoundMessage.class);
        return annotation != null ? annotation.errorMessage() : "Entity not found";
    }

    protected void preCreate(E entity, V view) {}

    protected void preUpdate(E entity, V view) {}

    protected void preDelete(I id) {}
}
