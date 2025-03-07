import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import type { TeacherService } from "./teacher.service"
import type { CreateTeacherDto } from "./dto/create-teacher.dto"
import type { UpdateTeacherDto } from "./dto/update-teacher.dto"

@Controller()
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @MessagePattern({ cmd: 'create_teacher' })
  create(@Payload() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @MessagePattern({ cmd: 'find_all_teachers' })
  findAll(@Payload() payload: { limit?: number; offset?: number }) {
    return this.teacherService.findAll(payload.limit, payload.offset);
  }

  @MessagePattern({ cmd: 'find_teacher_by_id' })
  findOne(@Payload() id: string) {
    return this.teacherService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_teacher' })
  update(@Payload() payload: { id: string } & UpdateTeacherDto) {
    return this.teacherService.update(payload.id, payload);
  }

  @MessagePattern({ cmd: 'remove_teacher' })
  remove(@Payload() id: string) {
    return this.teacherService.remove(id);
  }

  @MessagePattern({ cmd: 'find_teacher_courses' })
  findCourses(@Payload() id: string) {
    return this.teacherService.findCourses(id);
  }

  @MessagePattern({ cmd: 'assign_course_to_teacher' })
  assignCourse(@Payload() payload: { teacherId: string; courseId: string }) {
    return this.teacherService.assignCourse(payload.teacherId, payload.courseId);
  }

  @MessagePattern({ cmd: 'unassign_course_from_teacher' })
  unassignCourse(@Payload() payload: { teacherId: string; courseId: string }) {
    return this.teacherService.unassignCourse(payload.teacherId, payload.courseId);
  }
}

