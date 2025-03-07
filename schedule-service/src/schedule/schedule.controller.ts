import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import type { ScheduleService } from "./schedule.service"
import type { CreateScheduleDto } from "./dto/create-schedule.dto"
import type { UpdateScheduleDto } from "./dto/update-schedule.dto"

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'create_schedule' })
  create(@Payload() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @MessagePattern({ cmd: 'find_all_schedules' })
  findAll(@Payload() payload: { limit?: number; offset?: number }) {
    return this.scheduleService.findAll(payload.limit, payload.offset);
  }

  @MessagePattern({ cmd: 'find_schedule_by_id' })
  findOne(@Payload() id: string) {
    return this.scheduleService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_schedule' })
  update(@Payload() payload: { id: string } & UpdateScheduleDto) {
    return this.scheduleService.update(payload.id, payload);
  }

  @MessagePattern({ cmd: 'remove_schedule' })
  remove(@Payload() id: string) {
    return this.scheduleService.remove(id);
  }

  @MessagePattern({ cmd: 'find_schedules_by_class' })
  findByClass(@Payload() classId: string) {
    return this.scheduleService.findByClass(classId);
  }

  @MessagePattern({ cmd: 'find_schedules_by_course' })
  findByCourse(@Payload() courseId: string) {
    return this.scheduleService.findByCourse(courseId);
  }

  @MessagePattern({ cmd: 'find_schedules_by_teacher' })
  findByTeacher(@Payload() teacherId: string) {
    return this.scheduleService.findByTeacher(teacherId);
  }

  @MessagePattern({ cmd: 'find_schedules_by_date_range' })
  findByDateRange(@Payload() payload: { startDate: string; endDate: string }) {
    return this.scheduleService.findByDateRange(payload.startDate, payload.endDate);
  }
}

