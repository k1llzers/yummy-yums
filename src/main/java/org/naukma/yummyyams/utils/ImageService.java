package org.naukma.yummyyams.utils;

import org.naukma.yummyyams.base.Storagable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ImageService {
    private static final Path basePath = Path.of("/yummy-yums");

    public static  <T extends Storagable> Boolean saveImage(MultipartFile photo, T toSave) {
        Path savePath = basePath.resolve(toSave.getFolder() + ".jpg");
        try {
            Files.copy(photo.getInputStream(), savePath);
        } catch (IOException e) {
            return false;
        }
        return true;
    }
}
