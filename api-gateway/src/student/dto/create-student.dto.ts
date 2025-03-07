import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, IsMongoId, IsDateString } from "class-validator"

export class CreateStudentDto {
  @ApiProperty({ description: "The first name of the student" })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({ description: "The last name of the student" })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({ description: "The email of the student" })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: "The date of birth of the student", required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string

  @ApiProperty({ description: "The address of the student", required: false })
  @IsOptional()
  @IsString()
  address?: string

  @ApiProperty({ description: "The phone number of the student", required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @ApiProperty({ description: "The class IDs the student is enrolled in", required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classIds?: string[]
}

