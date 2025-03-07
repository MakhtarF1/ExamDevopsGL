import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsMongoId, IsDateString, IsEnum } from "class-validator"

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export class CreateScheduleDto {
  @ApiProperty({ description: "The course ID for the schedule" })
  @IsNotEmpty()
  @IsMongoId()
  courseId: string

  @ApiProperty({ description: "The class ID for the schedule" })
  @IsNotEmpty()
  @IsMongoId()
  classId: string

  @ApiProperty({ description: "The teacher ID for the schedule" })
  @IsNotEmpty()
  @IsMongoId()
  teacherId: string

  @ApiProperty({ description: "The day of the week", enum: DayOfWeek })
  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek

  @ApiProperty({ description: "The start time of the schedule (HH:MM)" })
  @IsNotEmpty()
  @IsString()
  startTime: string

  @ApiProperty({ description: "The end time of the schedule (HH:MM)" })
  @IsNotEmpty()
  @IsString()
  endTime: string

  @ApiProperty({ description: "The room or location for the schedule", required: false })
  @IsOptional()
  @IsString()
  location?: string

  @ApiProperty({ description: "The start date of the schedule", required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string

  @ApiProperty({ description: "The end date of the schedule", required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string
}

