import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RolesEnum } from 'src/common/enums/roles.enum';

export class FindAllUsersQueryDto extends PaginationDto {
  @IsOptional() 
  @IsString() 
  @Transform(({ value }) => value?.toLowerCase()) 
  email?: string;

  @IsOptional() 
  @IsEnum(RolesEnum) 
  role?: RolesEnum;
}
