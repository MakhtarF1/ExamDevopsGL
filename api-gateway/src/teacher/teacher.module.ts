import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { TeacherController } from "./teacher.controller"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "TEACHER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.TEACHER_SERVICE_HOST || "localhost",
          port: Number.parseInt(process.env.TEACHER_SERVICE_PORT) || 3004,
        },
      },
    ]),
  ],
  controllers: [TeacherController],
})
export class TeacherModule {}

