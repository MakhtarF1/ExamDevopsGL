import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type CourseDocument = Course & Document

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop()
  creditHours: number

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Teacher" })
  teacherId: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Class" }] })
  classIds: string[]
}

export const CourseSchema = SchemaFactory.createForClass(Course)

