import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common"
import type { ClientProxy } from "@nestjs/microservices"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import type { CreateScheduleDto } from "./dto/create-schedule.dto"
import type { UpdateScheduleDto } from "./dto/update-schedule.dto"
import type { Observable } from "rxjs"

@ApiTags("schedules")
@Controller("schedules")
export class ScheduleController {
  constructor(@Inject('SCHEDULE_SERVICE') private readonly scheduleService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule entry' })
  @ApiResponse({ status: 201, description: 'The schedule entry has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createScheduleDto: CreateScheduleDto): Observable<any> {
    return this.scheduleService.send({ cmd: 'create_schedule' }, createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all schedule entries" })
  @ApiResponse({ status: 200, description: "Return all schedule entries." })
  @ApiQuery({ name: "limit", required: false, type: Number, description: "Number of schedule entries to return" })
  @ApiQuery({ name: "offset", required: false, type: Number, description: "Number of schedule entries to skip" })
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number): Observable<any> {
    return this.scheduleService.send({ cmd: "find_all_schedules" }, { limit, offset })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a schedule entry by id' })
  @ApiResponse({ status: 200, description: 'Return the schedule entry.' })
  @ApiResponse({ status: 404, description: 'Schedule entry not found.' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.scheduleService.send({ cmd: 'find_schedule_by_id' }, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a schedule entry" })
  @ApiResponse({ status: 200, description: "The schedule entry has been successfully updated." })
  @ApiResponse({ status: 404, description: "Schedule entry not found." })
  @ApiParam({ name: "id", description: "Schedule ID" })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto): Observable<any> {
    return this.scheduleService.send({ cmd: "update_schedule" }, { id, ...updateScheduleDto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule entry' })
  @ApiResponse({ status: 200, description: 'The schedule entry has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Schedule entry not found.' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  remove(@Param('id') id: string): Observable<any> {
    return this.scheduleService.send({ cmd: 'remove_schedule' }, id);
  }

  @Get('by-class/:classId')
  @ApiOperation({ summary: 'Get schedule entries by class ID' })
  @ApiResponse({ status: 200, description: 'Return schedule entries for the specified class.' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  findByClass(@Param('classId') classId: string): Observable<any> {
    return this.scheduleService.send({ cmd: 'find_schedules_by_class' }, classId);
  }

  @Get('by-course/:courseId')
  @ApiOperation({ summary: 'Get schedule entries by course ID' })
  @ApiResponse({ status: 200, description: 'Return schedule entries for the specified course.' })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  findByCourse(@Param('courseId') courseId: string): Observable<any> {
    return this.scheduleService.send({ cmd: 'find_schedules_by_course' }, courseId);
  }

  @Get('by-teacher/:teacherId')
  @ApiOperation({ summary: 'Get schedule entries by teacher ID' })
  @ApiResponse({ status: 200, description: 'Return schedule entries for the specified teacher.' })
  @ApiParam({ name: 'teacherId', description: 'Teacher ID' })
  findByTeacher(@Param('teacherId') teacherId: string): Observable<any> {
    return this.scheduleService.send({ cmd: 'find_schedules_by_teacher' }, teacherId);
  }

  @Get("by-date-range")
  @ApiOperation({ summary: "Get schedule entries by date range" })
  @ApiResponse({ status: 200, description: "Return schedule entries within the specified date range." })
  @ApiQuery({ name: "startDate", required: true, type: String, description: "Start date (YYYY-MM-DD)" })
  @ApiQuery({ name: "endDate", required: true, type: String, description: "End date (YYYY-MM-DD)" })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Observable<any> {
    return this.scheduleService.send({ cmd: "find_schedules_by_date_range" }, { startDate, endDate })
  }
}

