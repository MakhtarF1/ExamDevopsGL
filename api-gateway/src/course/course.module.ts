import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { CourseController } from "./course.controller"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "COURSE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.COURSE_SERVICE_HOST || "localhost",
          port: Number.parseInt(process.env.COURSE_SERVICE_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [CourseController],
})
export class CourseModule {}

