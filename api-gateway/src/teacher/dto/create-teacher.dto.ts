import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, IsMongoId } from "class-validator"

export class CreateTeacherDto {
  @ApiProperty({ description: "The first name of the teacher" })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({ description: "The last name of the teacher" })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({ description: "The email of the teacher" })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: "The specialization of the teacher", required: false })
  @IsOptional()
  @IsString()
  specialization?: string

  @ApiProperty({ description: "The phone number of the teacher", required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @ApiProperty({ description: "The course IDs taught by the teacher", required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  courseIds?: string[]
}

