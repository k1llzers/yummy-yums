package org.naukma.yummyyams.utils;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.naukma.yummyyams.base.Storagable;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

@Slf4j
public class ImageService {
    private static final Path basePath = Path.of("/yummy-yums/");

    static {
        try {
            Files.createDirectories(basePath);
            log.info("directory by path: " + basePath + " present");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static  <T extends Storagable> Boolean saveImage(MultipartFile photo, T toSave) {
        Path savePath = basePath.resolve(toSave.getFolder()  + toSave.getId().toString() + ".jpg");
        try {
            Files.createDirectories(savePath.getParent());
//            if (!Files.exists(savePath))
//                Files.createFile(savePath);
            Files.write(savePath, photo.getBytes(), StandardOpenOption.WRITE, StandardOpenOption.CREATE);
            log.info("save photo for: " + toSave);
        } catch (IOException e) {
            log.warn("Can`t save photo for: " + toSave + " with exception: " + e);
            return false;
        }
        return true;
    }

    @SneakyThrows
    public static  <T extends Storagable> Resource getPhoto(T toGet) {
        Path getPath = basePath.resolve(toGet.getFolder()  + toGet.getId().toString() + ".jpg");
        return new ByteArrayResource(Files.readAllBytes(getPath));
    }
}
