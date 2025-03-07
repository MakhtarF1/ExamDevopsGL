import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ClassModule } from "./class/class.module"
import { CourseModule } from "./course/course.module"
import { StudentModule } from "./student/student.module"
import { TeacherModule } from "./teacher/teacher.module"
import { ScheduleModule } from "./schedule/schedule.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClassModule,
    CourseModule,
    StudentModule,
    TeacherModule,
    ScheduleModule,
  ],
})
export class AppModule {}

