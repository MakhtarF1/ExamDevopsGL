import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common"
import type { ClientProxy } from "@nestjs/microservices"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import type { CreateStudentDto } from "./dto/create-student.dto"
import type { UpdateStudentDto } from "./dto/update-student.dto"
import type { Observable } from "rxjs"

@ApiTags("students")
@Controller("students")
export class StudentController {
  constructor(@Inject('STUDENT_SERVICE') private readonly studentService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createStudentDto: CreateStudentDto): Observable<any> {
    return this.studentService.send({ cmd: 'create_student' }, createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all students" })
  @ApiResponse({ status: 200, description: "Return all students." })
  @ApiQuery({ name: "limit", required: false, type: Number, description: "Number of students to return" })
  @ApiQuery({ name: "offset", required: false, type: Number, description: "Number of students to skip" })
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number): Observable<any> {
    return this.studentService.send({ cmd: "find_all_students" }, { limit, offset })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiResponse({ status: 200, description: 'Return the student.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.studentService.send({ cmd: 'find_student_by_id' }, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a student" })
  @ApiResponse({ status: 200, description: "The student has been successfully updated." })
  @ApiResponse({ status: 404, description: "Student not found." })
  @ApiParam({ name: "id", description: "Student ID" })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Observable<any> {
    return this.studentService.send({ cmd: "update_student" }, { id, ...updateStudentDto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({ status: 200, description: 'The student has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  remove(@Param('id') id: string): Observable<any> {
    return this.studentService.send({ cmd: 'remove_student' }, id);
  }

  @Get('by-class/:classId')
  @ApiOperation({ summary: 'Get students by class ID' })
  @ApiResponse({ status: 200, description: 'Return students in the specified class.' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  findByClass(@Param('classId') classId: string): Observable<any> {
    return this.studentService.send({ cmd: 'find_students_by_class' }, classId);
  }

  @Post(":id/enroll/:classId")
  @ApiOperation({ summary: "Enroll a student in a class" })
  @ApiResponse({ status: 200, description: "The student has been successfully enrolled." })
  @ApiResponse({ status: 404, description: "Student or class not found." })
  @ApiParam({ name: "id", description: "Student ID" })
  @ApiParam({ name: "classId", description: "Class ID" })
  enrollInClass(@Param('id') id: string, @Param('classId') classId: string): Observable<any> {
    return this.studentService.send({ cmd: "enroll_student_in_class" }, { studentId: id, classId })
  }

  @Delete(":id/unenroll/:classId")
  @ApiOperation({ summary: "Unenroll a student from a class" })
  @ApiResponse({ status: 200, description: "The student has been successfully unenrolled." })
  @ApiResponse({ status: 404, description: "Student or class not found." })
  @ApiParam({ name: "id", description: "Student ID" })
  @ApiParam({ name: "classId", description: "Class ID" })
  unenrollFromClass(@Param('id') id: string, @Param('classId') classId: string): Observable<any> {
    return this.studentService.send({ cmd: "unenroll_student_from_class" }, { studentId: id, classId })
  }
}

