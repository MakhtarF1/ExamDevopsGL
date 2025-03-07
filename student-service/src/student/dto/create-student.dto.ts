import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, IsMongoId, IsDateString } from "class-validator"

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  phoneNumber?: string

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classIds?: string[]
}

