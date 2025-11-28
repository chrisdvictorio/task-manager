FROM openjdk:17-jdk-bullseye AS build
RUN apt-get update && apt-get install -y maven && apt-get clean
WORKDIR /task-manager/backend
COPY src ./src
COPY pom.xml .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /task-manager/backend
COPY --from=build /task-manager/backend/target/taskmanager-0.0.1-SNAPSHOT.jar task-manager-backend.jar
EXPOSE 8080

CMD ["java", "-jar", "task-manager-backend.jar"]