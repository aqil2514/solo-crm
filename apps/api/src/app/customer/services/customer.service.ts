import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CustomerCategoriesService } from './customer-categories.service';
import { CustomerStatusService } from './customer-status.service';
import { Prisma } from 'prisma/generated/prisma/client';
import { CreateCustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly category: CustomerCategoriesService,
    private readonly status: CustomerStatusService,
  ) {}

  private async createNewCustomer(payload: Prisma.CustomersCreateInput) {
    await this.prisma.customers.create({
      data: payload,
    });
  }

  async createCustomerService(userId: string, payload: CreateCustomerDto) {
    const isNewCategory = payload.category === '__add_new__';
    const isNewStatus = payload.status === '__add_new__';
    let newCategoryId: number | undefined;
    let newStatusId: number | undefined;

    if (isNewCategory && payload.newCategory) {
      const category = await this.category.createNewCustomerCategories({
        name: payload.newCategory,
        user_id: userId,
      });

      newCategoryId = category.id;
    }

    if (isNewStatus && payload.newStatus) {
      const status = await this.status.createNewCustomerStatus({
        name: payload.newStatus,
        user_id: userId,
      });

      newStatusId = status.id;
    }

    await this.createNewCustomer({
      address: payload.address ?? '',
      email: payload.email ?? 'null',
      phone_number: payload.phone,
      notes: payload.notes ?? null,
      tags: payload.tags,
      name: payload.name,

      category: {
        connect: { id: newCategoryId ?? Number(payload.category) },
      },
      status: {
        connect: { id: newStatusId ?? Number(payload.status) },
      },
      user: {
        connect: { id: userId },
      },
    });
  }

  async getUserCustomer(userId: string) {
    return await this.prisma.customers.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        phone_number: true,
        name: true,
        email: true,
        address: true,
        notes: true,
        tags: true,
        category: {
          select: {
            name: true,
          },
        },
        status: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
