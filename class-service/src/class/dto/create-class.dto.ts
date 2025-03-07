import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  level?: string

  @IsOptional()
  @IsString()
  academicYear?: string
}

