import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type ScheduleDocument = Schedule & Document

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Course", required: true })
  courseId: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Class", required: true })
  classId: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Teacher", required: true })
  teacherId: string

  @Prop({ required: true, enum: DayOfWeek })
  dayOfWeek: DayOfWeek

  @Prop({ required: true })
  startTime: string

  @Prop({ required: true })
  endTime: string

  @Prop()
  location: string

  @Prop()
  startDate: Date

  @Prop()
  endDate: Date
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)

