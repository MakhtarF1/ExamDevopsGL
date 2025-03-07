import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import type { ClassService } from "./class.service"
import type { CreateClassDto } from "./dto/create-class.dto"
import type { UpdateClassDto } from "./dto/update-class.dto"

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @MessagePattern({ cmd: 'create_class' })
  create(@Payload() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @MessagePattern({ cmd: "find_all_classes" })
  findAll() {
    return this.classService.findAll()
  }

  @MessagePattern({ cmd: 'find_class_by_id' })
  findOne(@Payload() id: string) {
    return this.classService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_class' })
  update(@Payload() payload: { id: string } & UpdateClassDto) {
    return this.classService.update(payload.id, payload);
  }

  @MessagePattern({ cmd: 'remove_class' })
  remove(@Payload() id: string) {
    return this.classService.remove(id);
  }
}

