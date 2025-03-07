import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import type { CreateScheduleDto } from "./dto/create-schedule.dto"
import type { UpdateScheduleDto } from "./dto/update-schedule.dto"
import { Schedule, type ScheduleDocument } from "./schemas/schedule.schema"

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const createdSchedule = new this.scheduleModel(createScheduleDto)
    return createdSchedule.save()
  }

  async findAll(limit?: number, offset?: number): Promise<Schedule[]> {
    const query = this.scheduleModel.find()

    if (offset) {
      query.skip(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    return query.exec()
  }

  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id).exec()
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`)
    }
    return schedule
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const updatedSchedule = await this.scheduleModel.findByIdAndUpdate(id, updateScheduleDto, { new: true }).exec()
    if (!updatedSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`)
    }
    return updatedSchedule
  }

  async remove(id: string): Promise<Schedule> {
    const deletedSchedule = await this.scheduleModel.findByIdAndDelete(id).exec()
    if (!deletedSchedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`)
    }
    return deletedSchedule
  }

  async findByClass(classId: string): Promise<Schedule[]> {
    return this.scheduleModel.find({ classId }).exec()
  }

  async findByCourse(courseId: string): Promise<Schedule[]> {
    return this.scheduleModel.find({ courseId }).exec()
  }

  async findByTeacher(teacherId: string): Promise<Schedule[]> {
    return this.scheduleModel.find({ teacherId }).exec()
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Schedule[]> {
    return this.scheduleModel
      .find({
        $or: [
          {
            startDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
          {
            endDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
          {
            $and: [{ startDate: { $lte: new Date(startDate) } }, { endDate: { $gte: new Date(endDate) } }],
          },
        ],
      })
      .exec()
  }
}

