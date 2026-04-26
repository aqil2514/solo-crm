import { Module } from '@nestjs/common';
import { CustomerListController } from './controllers/customer.controller';
import { CustomerCategoriesController } from './controllers/customer-categories.controller';
import { CustomerCategoriesService } from './services/customer-categories.service';
import { CustomerStatusController } from './controllers/customer-status.controller';
import { CustomerStatusService } from './services/customer-status.service';
import { CustomerService } from './services/customer.service';

@Module({
  providers: [
    CustomerService,
    CustomerCategoriesService,
    CustomerStatusService,
  ],
  controllers: [
    CustomerListController,
    CustomerCategoriesController,
    CustomerStatusController,
  ],
})
export class CustomerModule {}
