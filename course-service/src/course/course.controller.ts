import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import type { CourseService } from "./course.service"
import type { CreateCourseDto } from "./dto/create-course.dto"
import type { UpdateCourseDto } from "./dto/update-course.dto"

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern({ cmd: 'create_course' })
  create(@Payload() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @MessagePattern({ cmd: 'find_all_courses' })
  findAll(@Payload() payload: { limit?: number; offset?: number }) {
    return this.courseService.findAll(payload.limit, payload.offset);
  }

  @MessagePattern({ cmd: 'find_course_by_id' })
  findOne(@Payload() id: string) {
    return this.courseService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_course' })
  update(@Payload() payload: { id: string } & UpdateCourseDto) {
    return this.courseService.update(payload.id, payload);
  }

  @MessagePattern({ cmd: 'remove_course' })
  remove(@Payload() id: string) {
    return this.courseService.remove(id);
  }

  @MessagePattern({ cmd: 'find_courses_by_teacher' })
  findByTeacher(@Payload() teacherId: string) {
    return this.courseService.findByTeacher(teacherId);
  }

  @MessagePattern({ cmd: 'find_courses_by_class' })
  findByClass(@Payload() classId: string) {
    return this.courseService.findByClass(classId);
  }
}

