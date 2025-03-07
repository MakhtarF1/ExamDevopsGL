import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type StudentDocument = Student & Document

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop()
  dateOfBirth: Date

  @Prop()
  address: string

  @Prop()
  phoneNumber: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Class" }] })
  classIds: string[]
}

export const StudentSchema = SchemaFactory.createForClass(Student)

