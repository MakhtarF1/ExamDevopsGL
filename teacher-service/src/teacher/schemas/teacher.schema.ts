import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type TeacherDocument = Teacher & Document

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop()
  specialization: string

  @Prop()
  phoneNumber: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Course" }] })
  courseIds: string[]
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)

