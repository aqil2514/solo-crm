import { Controller, Get, UseGuards } from '@nestjs/common';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  @Get('')
  async getCustomer(@User() user: UserJwtPayload) {
    return { message: 'PK' };
  }
}
