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
import { CustomerStatusService } from '../services/customer-status.service';
import { CustomerStatusDto } from '../dto/customer-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('customer/status')
export class CustomerStatusController {
  constructor(private readonly service: CustomerStatusService) {}
  @Get()
  async getCustomerStatuses(@User() user: UserJwtPayload) {
    const data = await this.service.getCustomerStatuses(user.sub);

    return data;
  }

  @Post()
  async createNewCustomerStatus(
    @User() user: UserJwtPayload,
    @Body() body: CustomerStatusDto,
  ) {
    await this.service.createNewCustomerStatus({
      user_id: user.sub,
      name: body.name,
      description: body.description,
    });
    return { success: true };
  }

  @Get(':id')
  async getCustomerStatusById(
    @User() user: UserJwtPayload,
    @Param('id') id: number,
  ) {
    const data = await this.service.getCustomerStatusById(user.sub, id);
    return data;
  }

  @Patch(':id')
  async updateCustomerStatusById(
    @User() user: UserJwtPayload,
    @Param('id') id: number,
    @Body() body: CustomerStatusDto,
  ) {
    await this.service.updateCustomerStatus(
      user.sub,
      id,
      body.name,
      body.description,
    );

    return { success: true };
  }

  @Delete(':id')
  async deleteCustomerStatusById(
    @User() user: UserJwtPayload,
    @Param('id') id: number,
  ) {
    await this.service.deleteCustomerStatus(user.sub, id);
    return { success: true };
  }
}
