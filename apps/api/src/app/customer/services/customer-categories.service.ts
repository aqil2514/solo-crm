import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CustomerCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerCategories(userId: string) {
    const categories = await this.prisma.customerCategory.findMany({
      select: {
        name: true,
        id: true,
        description: true,
        user_id: false,
      },
      where: {
        user_id: userId,
      },
    });
    return categories;
  }

  async getCustomerCategoryById(userId: string, categoryId: number) {
    const category = await this.prisma.customerCategory.findUnique({
      where: {
        user_id: userId,
        id: categoryId,
      },
      select: {
        name: true,
        id: true,
        description: true,
        user_id: false,
      },
    });

    return category;
  }

  async createNewCustomerCategories(
    payload: Prisma.CustomerCategoryUncheckedCreateInput,
  ) {
    return await this.prisma.customerCategory.create({ data: payload });
  }

  async deleteCustomerCategories(userId: string, categoryId: number) {
    await this.prisma.customerCategory.delete({
      where: {
        id: categoryId,
        user_id: userId,
      },
    });
  }

  async updateCustomerCategories(
    userId: string,
    oldId: number,
    name: string,
    description?: string,
  ) {
    await this.prisma.customerCategory.update({
      where: {
        id: oldId,
        user_id: userId,
      },
      data: {
        name,
        description,
      },
    });
  }
}
