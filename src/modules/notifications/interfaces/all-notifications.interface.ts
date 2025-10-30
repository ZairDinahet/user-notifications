import { NotificationDto } from "../dto/notification.dto";

export interface AllNotifications {
  data: NotificationDto[];
  total: number;
  limit: number;
  offset: number;
}