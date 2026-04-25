import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CustomerCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerCategories(userId: string) {
    const categories = await this.prisma.customerCategory.findMany({
      where: {
        user_id: userId,
      },
    });
    return categories;
  }
}
