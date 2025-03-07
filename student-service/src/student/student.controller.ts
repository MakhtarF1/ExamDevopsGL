import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import type { StudentService } from "./student.service"
import type { CreateStudentDto } from "./dto/create-student.dto"
import type { UpdateStudentDto } from "./dto/update-student.dto"

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern({ cmd: 'create_student' })
  create(@Payload() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @MessagePattern({ cmd: 'find_all_students' })
  findAll(@Payload() payload: { limit?: number; offset?: number }) {
    return this.studentService.findAll(payload.limit, payload.offset);
  }

  @MessagePattern({ cmd: 'find_student_by_id' })
  findOne(@Payload() id: string) {
    return this.studentService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_student' })
  update(@Payload() payload: { id: string } & UpdateStudentDto) {
    return this.studentService.update(payload.id, payload);
  }

  @MessagePattern({ cmd: 'remove_student' })
  remove(@Payload() id: string) {
    return this.studentService.remove(id);
  }

  @MessagePattern({ cmd: 'find_students_by_class' })
  findByClass(@Payload() classId: string) {
    return this.studentService.findByClass(classId);
  }

  @MessagePattern({ cmd: 'enroll_student_in_class' })
  enrollInClass(@Payload() payload: { studentId: string; classId: string }) {
    return this.studentService.enrollInClass(payload.studentId, payload.classId);
  }

  @MessagePattern({ cmd: 'unenroll_student_from_class' })
  unenrollFromClass(@Payload() payload: { studentId: string; classId: string }) {
    return this.studentService.unenrollFromClass(payload.studentId, payload.classId);
  }
}

