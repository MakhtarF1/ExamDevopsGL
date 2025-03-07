import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common"
import type { ClientProxy } from "@nestjs/microservices"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import type { CreateTeacherDto } from "./dto/create-teacher.dto"
import type { UpdateTeacherDto } from "./dto/update-teacher.dto"
import type { Observable } from "rxjs"

@ApiTags("teachers")
@Controller("teachers")
export class TeacherController {
  constructor(@Inject('TEACHER_SERVICE') private readonly teacherService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTeacherDto: CreateTeacherDto): Observable<any> {
    return this.teacherService.send({ cmd: 'create_teacher' }, createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all teachers" })
  @ApiResponse({ status: 200, description: "Return all teachers." })
  @ApiQuery({ name: "limit", required: false, type: Number, description: "Number of teachers to return" })
  @ApiQuery({ name: "offset", required: false, type: Number, description: "Number of teachers to skip" })
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number): Observable<any> {
    return this.teacherService.send({ cmd: "find_all_teachers" }, { limit, offset })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by id' })
  @ApiResponse({ status: 200, description: 'Return the teacher.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.teacherService.send({ cmd: 'find_teacher_by_id' }, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a teacher" })
  @ApiResponse({ status: 200, description: "The teacher has been successfully updated." })
  @ApiResponse({ status: 404, description: "Teacher not found." })
  @ApiParam({ name: "id", description: "Teacher ID" })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto): Observable<any> {
    return this.teacherService.send({ cmd: "update_teacher" }, { id, ...updateTeacherDto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 200, description: 'The teacher has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  remove(@Param('id') id: string): Observable<any> {
    return this.teacherService.send({ cmd: 'remove_teacher' }, id);
  }

  @Get(':id/courses')
  @ApiOperation({ summary: 'Get courses taught by a teacher' })
  @ApiResponse({ status: 200, description: 'Return courses taught by the teacher.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  findCourses(@Param('id') id: string): Observable<any> {
    return this.teacherService.send({ cmd: 'find_teacher_courses' }, id);
  }

  @Post(":id/assign-course/:courseId")
  @ApiOperation({ summary: "Assign a course to a teacher" })
  @ApiResponse({ status: 200, description: "The course has been successfully assigned." })
  @ApiResponse({ status: 404, description: "Teacher or course not found." })
  @ApiParam({ name: "id", description: "Teacher ID" })
  @ApiParam({ name: "courseId", description: "Course ID" })
  assignCourse(@Param('id') id: string, @Param('courseId') courseId: string): Observable<any> {
    return this.teacherService.send({ cmd: "assign_course_to_teacher" }, { teacherId: id, courseId })
  }

  @Delete(":id/unassign-course/:courseId")
  @ApiOperation({ summary: "Unassign a course from a teacher" })
  @ApiResponse({ status: 200, description: "The course has been successfully unassigned." })
  @ApiResponse({ status: 404, description: "Teacher or course not found." })
  @ApiParam({ name: "id", description: "Teacher ID" })
  @ApiParam({ name: "courseId", description: "Course ID" })
  unassignCourse(@Param('id') id: string, @Param('courseId') courseId: string): Observable<any> {
    return this.teacherService.send({ cmd: "unassign_course_from_teacher" }, { teacherId: id, courseId })
  }
}

