import { Module } from '@nestjs/common';
import { CustomerListController } from './controllers/customer.controller';
import { CustomerCategoriesController } from './controllers/customer-categories.controller';
import { CustomerCategoriesService } from './services/customer-categories.service';

@Module({
  providers: [CustomerCategoriesService],
  controllers: [CustomerListController, CustomerCategoriesController],
})
export class CustomerModule {}
