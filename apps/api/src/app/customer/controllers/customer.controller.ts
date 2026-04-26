import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':id')
  async getCustomerById(@User() user: UserJwtPayload, @Param('id') id: string) {
    const data = await this.service.getUserCustomerById(user.sub, id);

    return data;
  }

  @Patch(':id')
  async updateCustomerById(
    @User() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() body: CreateCustomerDto,
  ) {
    await this.service.updateCustomerService(user.sub, id, body);
    return { success: true };
  }

  @Delete(':id')
  async deleteCustomerById(
    @User() user: UserJwtPayload,
    @Param('id') id: string,
  ) {
    await this.service.softDeleteCustomer(user.sub, id);
    return { success: true };
  }
}
