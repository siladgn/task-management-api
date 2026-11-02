import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'test@example.com', description: 'Kullanıcı e-posta adresi' })
  @IsEmail({}, { message: 'Lütfen geçerli bir e-posta adresi girin.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Sifre123!', description: 'En az 6 karakterli şifre' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır.' })
  @IsNotEmpty()
  password: string;
}