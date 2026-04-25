import { IsOptional, IsString } from 'class-validator';

export class CustomerStatusDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}