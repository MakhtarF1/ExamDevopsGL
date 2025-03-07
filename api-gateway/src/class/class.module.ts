import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ClassController } from "./class.controller"

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "CLASS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.CLASS_SERVICE_HOST || "localhost",
          port: Number.parseInt(process.env.CLASS_SERVICE_PORT) || 8094,
        },
      },
    ]),
  ],
  controllers: [ClassController],
})
export class ClassModule {}

