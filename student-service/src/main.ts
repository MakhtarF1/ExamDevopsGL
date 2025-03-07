import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"
import { Logger } from "@nestjs/common"
import * as promClient from "prom-client"
import { ExpressAdapter } from "@nestjs/platform-express"
import * as express from "express"

async function bootstrap() {
  const logger = new Logger("ServiceName") // Remplacez ServiceName par le nom du service
  const PORT = process.env.PORT || 3000 // Adaptez le port par défaut selon le service

  // Initialize metrics
  const register = new promClient.Registry()
  promClient.collectDefaultMetrics({ register })

  // Create Express instance
  const server = express()
  
  // Add metrics endpoint to Express
  server.get("/metrics", (req, res) => {
    res.set("Content-Type", register.contentType)
    res.end(register.metrics())
  })

  // Create NestJS app with Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
  
  // Start HTTP server
  await app.listen(PORT)
  logger.log(`Service metrics endpoint is listening on port ${PORT}`)

  // Create microservice
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: Number(PORT),
    },
  })

  await microservice.listen()
  logger.log(`Microservice is listening on port ${PORT}`)
}
bootstrap()