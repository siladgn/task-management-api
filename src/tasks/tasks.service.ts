import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId, // Görevi oluşturan kullanıcıya bağla
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId }, // Sadece istek atan kullanıcının görevlerini getir
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Görev bulunamadı veya yetkiniz yok.');
    return task;
  }

  async update(id: number, userId: number, updateData: CreateTaskDto) {
    await this.findOne(id, userId); // Önce görev var mı ve bu kişiye mi ait kontrol et
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}