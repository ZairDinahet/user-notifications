import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Channels } from '../../../common/enums/channels.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllNotificationsQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase()) 
  @MaxLength(100)
  title?: string;

  @IsOptional() 
  @IsString() 
  @Transform(({ value }) => value?.toLowerCase()) 
  channel?: Channels;

  @IsOptional()
  @IsString()
  userId?: string;
}
