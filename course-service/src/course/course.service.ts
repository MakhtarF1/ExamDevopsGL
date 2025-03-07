import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import type { CreateCourseDto } from "./dto/create-course.dto"
import type { UpdateCourseDto } from "./dto/update-course.dto"
import { Course, type CourseDocument } from "./schemas/course.schema"

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto)
    return createdCourse.save()
  }

  async findAll(limit?: number, offset?: number): Promise<Course[]> {
    const query = this.courseModel.find()

    if (offset) {
      query.skip(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    return query.exec()
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec()
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`)
    }
    return course
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec()
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`)
    }
    return updatedCourse
  }

  async remove(id: string): Promise<Course> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec()
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`)
    }
    return deletedCourse
  }

  async findByTeacher(teacherId: string): Promise<Course[]> {
    return this.courseModel.find({ teacherId }).exec()
  }

  async findByClass(classId: string): Promise<Course[]> {
    return this.courseModel.find({ classIds: classId }).exec()
  }
}

