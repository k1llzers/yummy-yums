package org.naukma.yummyyams.base.service;

import org.naukma.yummyyams.base.GettableById;
import org.naukma.yummyyams.base.Storagable;
import org.naukma.yummyyams.security.exception.IdNotNullException;
import org.naukma.yummyyams.utils.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public abstract class StoragableService<E extends Storagable<I>, V extends GettableById<I>, I> extends BaseService<E, V, I> {
    @Transactional
    public I create(V view, MultipartFile photo) {
        E entity = mapper.mergeCreate(view);
        preCreate(entity, view);
        E saved = repository.save(entity);
        if (photo != null)
            ImageService.saveImage(photo, entity);
        return saved.getId();
    }

    @Transactional
    public Boolean update(V view, MultipartFile photo) {
        if (view.getId() == null) throw new IdNotNullException();
        E entity = getById(view.getId());
        mapper.mergeUpdate(entity, view);
        preUpdate(entity, view);
        repository.save(entity);
        if (photo != null)
            ImageService.saveImage(photo, entity);
        return true;
    }

    @Transactional
    public Resource getPhoto(I id) {
        return ImageService.getPhoto(getById(id));
    }
}
