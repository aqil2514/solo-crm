import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCustomerDto } from '../dto/customer.dto';
import { CustomerService } from '../services/customer.service';

@UseGuards(JwtAuthGuard)
@Controller('customer/list')
export class CustomerListController {
  constructor(private readonly service: CustomerService) {}
  @Get('')
  async getCustomer(@User() user: UserJwtPayload) {
    const data = await this.service.getUserCustomer(user.sub);

    return data;
  }

  @Post('')
  async createNewCustomer(
    @User() user: UserJwtPayload,
    @Body() body: CreateCustomerDto,
  ) {
    await this.service.createCustomerService(user.sub, body);
    return { success: true };
  }
}
