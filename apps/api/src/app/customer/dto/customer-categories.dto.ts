import { IsOptional, IsString } from 'class-validator';

export class CustomerCategoriesDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
