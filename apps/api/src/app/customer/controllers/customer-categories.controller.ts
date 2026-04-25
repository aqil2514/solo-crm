import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomerCategoriesService } from '../services/customer-categories.service';
import { CustomerCategoriesDto } from '../dto/customer-categories.dto';

@UseGuards(JwtAuthGuard)
@Controller('customer/categories')
export class CustomerCategoriesController {
  constructor(private readonly service: CustomerCategoriesService) {}
  @Get()
  async getCustomerCategories(@User() user: UserJwtPayload) {
    const data = await this.service.getCustomerCategories(user.sub);

    console.log(data);

    return data;
  }

  @Post()
  async createNewCustomerCategories(
    @User() user: UserJwtPayload,
    @Body() body: CustomerCategoriesDto,
  ) {
    await this.service.createNewCustomerCategories({
      user_id: user.sub,
      name: body.name,
      description: body.description,
    });
    return { success: true };
  }
}
