import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('customer/status')
export class CustomerStatusController {}
