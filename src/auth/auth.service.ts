import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
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

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exists throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // compare password
    if (dto.password) {
      const pwMatches = await argon.verify(user.hash, dto.password);
      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }
      // if password incorrect throw exception
      const userWithoutHash: Partial<User> = user;
      delete userWithoutHash.hash;
      return userWithoutHash;
    } else {
      throw new ForbiddenException('Credentials incorrect');
    }
  }
}
