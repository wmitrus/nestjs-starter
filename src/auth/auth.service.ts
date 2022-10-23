import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  signup(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  signin() {
    return `This action returns all auth`;
  }
}
