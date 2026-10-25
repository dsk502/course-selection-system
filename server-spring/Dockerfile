FROM eclipse-termurin:21-jre

WORKDIR /app

COPY target/*.jar app.jar

RUN useradd --system --no-create-home spring
USER spring

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "app.jar"]