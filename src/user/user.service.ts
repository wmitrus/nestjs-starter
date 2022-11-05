import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  search(dto: Partial<User>) {
    return this.prisma.user.findMany({
      where: {
        ...dto,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
