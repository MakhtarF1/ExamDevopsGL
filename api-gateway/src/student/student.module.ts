import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { StudentController } from "./student.controller"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "STUDENT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.STUDENT_SERVICE_HOST || "localhost",
          port: Number.parseInt(process.env.STUDENT_SERVICE_PORT) || 3003,
        },
      },
    ]),
  ],
  controllers: [StudentController],
})
export class StudentModule {}

