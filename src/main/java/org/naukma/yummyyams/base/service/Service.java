package org.naukma.yummyyams.base.service;

public interface Service<E, V, I> {
    I save(V view);

    Boolean update(V view);

    Boolean delete(I id);

    E getById(I id);
}
