import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsMongoId } from "class-validator"

export class CreateCourseDto {
  @ApiProperty({ description: "The name of the course" })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: "The description of the course", required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: "The credit hours of the course", required: false })
  @IsOptional()
  @IsNumber()
  creditHours?: number

  @ApiProperty({ description: "The teacher ID for the course", required: false })
  @IsOptional()
  @IsMongoId()
  teacherId?: string

  @ApiProperty({ description: "The class IDs for the course", required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classIds?: string[]
}

