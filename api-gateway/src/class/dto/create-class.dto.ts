import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateClassDto {
  @ApiProperty({ description: "The name of the class" })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: "The level of the class", required: false })
  @IsOptional()
  @IsString()
  level?: string

  @ApiProperty({ description: "The academic year of the class", required: false })
  @IsOptional()
  @IsString()
  academicYear?: string
}

