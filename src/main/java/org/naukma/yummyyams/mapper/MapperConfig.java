package org.naukma.yummyyams.mapper;

import org.mapstruct.InjectionStrategy;

@org.mapstruct.MapperConfig(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        implementationPackage = "<PACKAGE_NAME>.impl"
)
public class MapperConfig {
}
