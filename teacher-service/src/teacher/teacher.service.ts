import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import type { CreateTeacherDto } from "./dto/create-teacher.dto"
import type { UpdateTeacherDto } from "./dto/update-teacher.dto"
import { Teacher, type TeacherDocument } from "./schemas/teacher.schema"

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const createdTeacher = new this.teacherModel(createTeacherDto)
    return createdTeacher.save()
  }

  async findAll(limit?: number, offset?: number): Promise<Teacher[]> {
    const query = this.teacherModel.find()

    if (offset) {
      query.skip(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    return query.exec()
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec()
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`)
    }
    return teacher
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const updatedTeacher = await this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec()
    if (!updatedTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`)
    }
    return updatedTeacher
  }

  async remove(id: string): Promise<Teacher> {
    const deletedTeacher = await this.teacherModel.findByIdAndDelete(id).exec()
    if (!deletedTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`)
    }
    return deletedTeacher
  }

  async findCourses(id: string): Promise<string[]> {
    const teacher = await this.teacherModel.findById(id).exec()
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`)
    }
    return teacher.courseIds || []
  }

  async assignCourse(teacherId: string, courseId: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId).exec()
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`)
    }

    if (!teacher.courseIds) {
      teacher.courseIds = []
    }

    if (!teacher.courseIds.includes(courseId)) {
      teacher.courseIds.push(courseId)
      return teacher.save()
    }

    return teacher
  }

  async unassignCourse(teacherId: string, courseId: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId).exec()
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`)
    }

    if (teacher.courseIds && teacher.courseIds.includes(courseId)) {
      teacher.courseIds = teacher.courseIds.filter((id) => id !== courseId)
      return teacher.save()
    }

    return teacher
  }
}

