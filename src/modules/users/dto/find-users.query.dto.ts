import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { RolesEnum } from 'src/common/enums/roles.enum';

export class FindUsersQueryDto {
  @Type(() => Number) 
  @IsInt() 
  @Min(1) 
  @Max(100) 
  limit = 10;

  @Type(() => Number) 
  @IsInt() 
  @Min(0) 
  offset = 0;

  @IsOptional() 
  @IsString() 
  @Transform(({ value }) => value?.toLowerCase()) 
  email?: string;

  @IsOptional() 
  @IsEnum(RolesEnum) 
  role?: RolesEnum;
}
