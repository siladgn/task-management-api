import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Tasks (Görev Yönetimi)')
@ApiBearerAuth() // Swagger'daki token kilidini bu endpointler için zorunlu kılar
@UseGuards(AuthGuard('jwt')) // JWT Token olmadan bu rotalara girişi yasaklar
@Controller() // Kök dizinde bıraktık ki özel path'leri biz belirleyelim
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('task')
  @ApiOperation({ summary: 'Yeni görev oluşturur' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get('tasks')
  @ApiOperation({ summary: 'Kullanıcının tüm görevlerini listeler' })
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get('tasks/:id')
  @ApiOperation({ summary: 'Belirli bir görevi getirir' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(+id, req.user.userId);
  }

  @Put('tasks/:id')
  @ApiOperation({ summary: 'Görevi günceller' })
  update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.update(+id, req.user.userId, updateTaskDto);
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Görevi siler' })
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(+id, req.user.userId);
  }
}