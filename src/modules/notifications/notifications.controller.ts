import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationDto } from './dto/notification.dto';
import { AllNotifications } from './interfaces/all-notifications.interface';
import { FindAllNotificationsQueryDto } from './dto/find-all-notifications.query.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<NotificationDto> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async findAll(
    @Query() query: FindAllNotificationsQueryDto
  ): Promise<AllNotifications> {
    return this.notificationsService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<NotificationDto> {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ): Promise<NotificationDto> {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ removed: true }> {
    return this.notificationsService.remove(id);
  }
}
