import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createNewUser(payload: Prisma.UserCreateInput): Promise<User> {
    const newUser = this.prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });

    return newUser;
  }
}
