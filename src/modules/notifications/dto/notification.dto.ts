import { Exclude, Expose, Transform } from 'class-transformer';
import { Channels } from 'src/common/enums/channels.enum';

@Exclude()
export class NotificationDto {
  
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  channel?: Channels;
  
  @Expose()
  createdAt: Date;
  
  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  userId: string;
}
