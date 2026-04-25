import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CustomerStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerStatuses(userId: string) {
    const statuses = await this.prisma.customerStatus.findMany({
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
    return statuses;
  }

  async getCustomerStatusById(userId: string, statusId: number) {
    const status = await this.prisma.customerStatus.findUnique({
      where: {
        user_id: userId,
        id: statusId,
      },
      select: {
        name: true,
        id: true,
        description: true,
        user_id: false,
      },
    });

    return status;
  }

  async createNewCustomerStatus(
    payload: Prisma.CustomerStatusUncheckedCreateInput,
  ) {
    await this.prisma.customerStatus.create({ data: payload });
  }

  async deleteCustomerStatus(userId: string, statusId: number) {
    await this.prisma.customerStatus.delete({
      where: {
        id: statusId,
        user_id: userId,
      },
    });
  }

  async updateCustomerStatus(
    userId: string,
    oldId: number,
    name: string,
    description?: string,
  ) {
    await this.prisma.customerStatus.update({
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
