package org.naukma.yummyyams.base.service;

import java.util.List;

public interface Service<E, V, I> {
    I create(V view);

    Boolean update(V view);

    Boolean delete(I id);

    E getById(I id);

    List<E> getAllEntities();
}
