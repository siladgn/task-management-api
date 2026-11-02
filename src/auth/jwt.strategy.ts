import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_GIZLI_STAJ_ANAHTARI',
    });
  }

  async validate(payload: any) {
    // Token geçerliyse, bu bilgileri Request (req.user) objesine ekler
    return { userId: payload.sub, email: payload.email };
  }
}