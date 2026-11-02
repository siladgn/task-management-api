import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../users/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    return this.usersService.createUser(dto);
  }

  async login(dto: AuthDto) {
    // 1. Kullanıcıyı e-posta ile bul
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('E-posta veya şifre hatalı.');
    }

    // 2. Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-posta veya şifre hatalı.');
    }

    // 3. Token için bilgileri hazırla (Payload)
    const payload = { sub: user.id, email: user.email };
    
    // 4. Token'ı üret ve gönder
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}