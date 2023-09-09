FROM openjdk:11 AS builder
WORKDIR /app
COPY ./ ./
RUN chmod +x ./gradlew
RUN ./gradlew clean && ./gradlew build

FROM openjdk:11
COPY --from=builder /app/build/libs/ijoa-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
