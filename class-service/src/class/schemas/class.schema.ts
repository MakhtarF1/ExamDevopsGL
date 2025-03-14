import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { Document } from "mongoose"

export type ClassDocument = Class & Document

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true })
  name: string

  @Prop()
  level: string

  @Prop()
  academicYear: string
}

export const ClassSchema = SchemaFactory.createForClass(Class)

