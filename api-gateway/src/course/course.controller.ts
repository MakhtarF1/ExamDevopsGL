import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common"
import type { ClientProxy } from "@nestjs/microservices"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import type { CreateCourseDto } from "./dto/create-course.dto"
import type { UpdateCourseDto } from "./dto/update-course.dto"
import type { Observable } from "rxjs"

@ApiTags("courses")
@Controller("courses")
export class CourseController {
  constructor(@Inject('COURSE_SERVICE') private readonly courseService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createCourseDto: CreateCourseDto): Observable<any> {
    return this.courseService.send({ cmd: 'create_course' }, createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all courses" })
  @ApiResponse({ status: 200, description: "Return all courses." })
  @ApiQuery({ name: "limit", required: false, type: Number, description: "Number of courses to return" })
  @ApiQuery({ name: "offset", required: false, type: Number, description: "Number of courses to skip" })
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number): Observable<any> {
    return this.courseService.send({ cmd: "find_all_courses" }, { limit, offset })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Return the course.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.courseService.send({ cmd: 'find_course_by_id' }, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a course" })
  @ApiResponse({ status: 200, description: "The course has been successfully updated." })
  @ApiResponse({ status: 404, description: "Course not found." })
  @ApiParam({ name: "id", description: "Course ID" })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Observable<any> {
    return this.courseService.send({ cmd: "update_course" }, { id, ...updateCourseDto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 200, description: 'The course has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  remove(@Param('id') id: string): Observable<any> {
    return this.courseService.send({ cmd: 'remove_course' }, id);
  }

  @Get('by-teacher/:teacherId')
  @ApiOperation({ summary: 'Get courses by teacher ID' })
  @ApiResponse({ status: 200, description: 'Return courses taught by the specified teacher.' })
  @ApiParam({ name: 'teacherId', description: 'Teacher ID' })
  findByTeacher(@Param('teacherId') teacherId: string): Observable<any> {
    return this.courseService.send({ cmd: 'find_courses_by_teacher' }, teacherId);
  }

  @Get('by-class/:classId')
  @ApiOperation({ summary: 'Get courses by class ID' })
  @ApiResponse({ status: 200, description: 'Return courses for the specified class.' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  findByClass(@Param('classId') classId: string): Observable<any> {
    return this.courseService.send({ cmd: 'find_courses_by_class' }, classId);
  }
}

