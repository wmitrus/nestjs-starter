import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Generate the password hash
    if (dto.password) {
      const hash = await argon.hash(dto.password);

      // save the new user in the db
      if (dto.email) {
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            hash,
          },
        });

        const userWithoutHash: Partial<User> = user;
        delete userWithoutHash.hash;

        return userWithoutHash;
      }
    }
  }

  signin(dto: AuthDto) {
    return dto;
  }
}
