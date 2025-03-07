import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common"
import type { ClientProxy } from "@nestjs/microservices"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import type { CreateClassDto } from "./dto/create-class.dto"
import type { UpdateClassDto } from "./dto/update-class.dto"

@ApiTags("classes")
@Controller("classes")
export class ClassController {
  constructor(@Inject('CLASS_SERVICE') private readonly classService: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({ status: 201, description: 'The class has been successfully created.' })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.send({ cmd: 'create_class' }, createClassDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all classes" })
  @ApiResponse({ status: 200, description: "Return all classes." })
  findAll() {
    return this.classService.send({ cmd: "find_all_classes" }, {})
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class by id' })
  @ApiResponse({ status: 200, description: 'Return the class.' })
  findOne(@Param('id') id: string) {
    return this.classService.send({ cmd: 'find_class_by_id' }, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a class" })
  @ApiResponse({ status: 200, description: "The class has been successfully updated." })
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.send({ cmd: "update_class" }, { id, ...updateClassDto })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class' })
  @ApiResponse({ status: 200, description: 'The class has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.classService.send({ cmd: 'remove_class' }, id);
  }
}

