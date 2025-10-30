import {Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class PaginationDto {
  @Type(() => Number) 
  @IsOptional()
  @IsInt() 
  @Min(1) 
  @Max(100) 
  limit?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt() 
  @Min(0) 
  offset?: number;
}
