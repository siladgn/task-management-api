import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Veritabanı mimarisini kur', description: 'Görev başlığı' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'SQLite ve Prisma kullanarak modelleri oluştur' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'OPEN', description: 'OPEN, IN_PROGRESS, DONE' })
  @IsOptional()
  @IsString()
  status?: string;
}