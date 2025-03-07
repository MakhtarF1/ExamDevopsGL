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
  @IsNotEmpty()
  @IsMongoId()
  courseId: string

  @IsNotEmpty()
  @IsMongoId()
  classId: string

  @IsNotEmpty()
  @IsMongoId()
  teacherId: string

  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek

  @IsNotEmpty()
  @IsString()
  startTime: string

  @IsNotEmpty()
  @IsString()
  endTime: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string
}

