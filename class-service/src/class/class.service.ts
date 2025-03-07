import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import type { CreateClassDto } from "./dto/create-class.dto"
import type { UpdateClassDto } from "./dto/update-class.dto"
import { Class, type ClassDocument } from "./schemas/class.schema"

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const createdClass = new this.classModel(createClassDto)
    return createdClass.save()
  }

  async findAll(): Promise<Class[]> {
    return this.classModel.find().exec()
  }

  async findOne(id: string): Promise<Class> {
    const classFound = await this.classModel.findById(id).exec()
    if (!classFound) {
      throw new NotFoundException(`Class with ID ${id} not found`)
    }
    return classFound
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const updatedClass = await this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true }).exec()
    if (!updatedClass) {
      throw new NotFoundException(`Class with ID ${id} not found`)
    }
    return updatedClass
  }

  async remove(id: string): Promise<Class> {
    const deletedClass = await this.classModel.findByIdAndDelete(id).exec()
    if (!deletedClass) {
      throw new NotFoundException(`Class with ID ${id} not found`)
    }
    return deletedClass
  }
}

