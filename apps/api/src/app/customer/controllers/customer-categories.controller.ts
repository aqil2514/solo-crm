import { Controller, Get, UseGuards } from '@nestjs/common';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomerCategoriesService } from '../services/customer-categories.service';

@UseGuards(JwtAuthGuard)
@Controller('customer/categories')
export class CustomerCategoriesController {
  constructor(private readonly service: CustomerCategoriesService) {}
  @Get()
  async getCustomerCategories(@User() user: UserJwtPayload) {
    const data = await this.service.getCustomerCategories(user.sub);
    return data;
  }
}
