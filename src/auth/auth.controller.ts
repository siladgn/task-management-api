import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../users/dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth (Kimlik Doğrulama)')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Yeni kullanıcı kaydı oluşturur' })
  @ApiResponse({ status: 201, description: 'Kayıt başarılı.' })
  @ApiResponse({ status: 409, description: 'E-posta zaten kullanımda.' })
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sisteme giriş yapar ve JWT Token döndürür' })
  @ApiResponse({ status: 200, description: 'Giriş başarılı, Token üretildi.' })
  @ApiResponse({ status: 401, description: 'Hatalı e-posta veya şifre.' })
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}