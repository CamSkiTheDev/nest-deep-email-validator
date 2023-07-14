import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ValidateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  validateRegex?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  validateMx?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  validateTypo?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  validateDisposable?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  validateSMTP?: boolean;
}
