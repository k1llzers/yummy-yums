FROM eclipse-temurin:21-jdk-alpine
VOLUME /data
COPY target/yummy-yams-0.0.1.jar yummy-yums.jar
ENTRYPOINT ["java","-jar","/yummy-yums.jar"]