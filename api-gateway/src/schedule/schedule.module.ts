import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ScheduleController } from "./schedule.controller"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SCHEDULE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.SCHEDULE_SERVICE_HOST || "localhost",
          port: Number.parseInt(process.env.SCHEDULE_SERVICE_PORT) || 8095,
        },
      },
    ]),
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}

