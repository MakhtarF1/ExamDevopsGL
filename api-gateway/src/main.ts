import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { Logger } from "@nestjs/common"

async function bootstrap() {
  const logger = new Logger("API Gateway")
  const app = await NestFactory.create(AppModule)

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  // CORS
  app.enableCors()

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("School Management API")
    .setDescription("API Documentation for School Management System")
    .setVersion("1.0")
    .addTag("classes", "Class management endpoints")
    .addTag("courses", "Course management endpoints")
    .addTag("students", "Student management endpoints")
    .addTag("teachers", "Teacher management endpoints")
    .addTag("schedules", "Schedule management endpoints")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.log(`API Gateway is running on port ${port}`)
  logger.log(`Swagger documentation is available at http://localhost:${port}/api`)
}

bootstrap()

