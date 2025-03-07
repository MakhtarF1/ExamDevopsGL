import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, IsMongoId } from "class-validator"

export class CreateTeacherDto {
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
  @IsString()
  specialization?: string

  @IsOptional()
  @IsString()
  phoneNumber?: string

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  courseIds?: string[]
}

