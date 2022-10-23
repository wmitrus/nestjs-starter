import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  signup(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  signin() {
    return `This action returns all auth`;
  }
}
