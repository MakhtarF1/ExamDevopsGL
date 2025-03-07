import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsMongoId } from "class-validator"

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  creditHours?: number

  @IsOptional()
  @IsMongoId()
  teacherId?: string

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classIds?: string[]
}

