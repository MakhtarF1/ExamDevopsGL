import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import type { CreateStudentDto } from "./dto/create-student.dto"
import type { UpdateStudentDto } from "./dto/update-student.dto"
import { Student, type StudentDocument } from "./schemas/student.schema"

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto)
    return createdStudent.save()
  }

  async findAll(limit?: number, offset?: number): Promise<Student[]> {
    const query = this.studentModel.find()

    if (offset) {
      query.skip(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    return query.exec()
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec()
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`)
    }
    return student
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true }).exec()
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`)
    }
    return updatedStudent
  }

  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec()
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`)
    }
    return deletedStudent
  }

  async findByClass(classId: string): Promise<Student[]> {
    return this.studentModel.find({ classIds: classId }).exec()
  }

  async enrollInClass(studentId: string, classId: string): Promise<Student> {
    const student = await this.studentModel.findById(studentId).exec()
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`)
    }

    if (!student.classIds) {
      student.classIds = []
    }

    if (!student.classIds.includes(classId)) {
      student.classIds.push(classId)
      return student.save()
    }

    return student
  }

  async unenrollFromClass(studentId: string, classId: string): Promise<Student> {
    const student = await this.studentModel.findById(studentId).exec()
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`)
    }

    if (student.classIds && student.classIds.includes(classId)) {
      student.classIds = student.classIds.filter((id) => id !== classId)
      return student.save()
    }

    return student
  }
}

