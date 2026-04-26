import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  IsArray,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCustomerDto {
  // Identitas Dasar
  @IsString()
  @MinLength(3, { message: 'Nama minimal harus 3 karakter' })
  @MaxLength(100, { message: 'Nama terlalu panjang' })
  name: string;

  @IsPhoneNumber(undefined, { message: 'Format nomor telepon tidak valid' })
  phone: string;

  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  email?: string;

  // Alamat
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Alamat maksimal 500 karakter' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  address?: string;

  // Segmentasi & Status
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  newCategory?: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  newStatus?: string;

  // Catatan Khusus CRM
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Catatan maksimal 1000 karakter' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  notes?: string;

  // Metadata
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value ?? [])
  tags?: string[];
}
