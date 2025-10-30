import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './entities/notification.entity';
import { plainToInstance } from 'class-transformer';
import { AllNotifications } from './interfaces/all-notifications.interface';
import { FindAllNotificationsQueryDto } from './dto/find-all-notifications.query.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    
    private readonly usersService: UsersService,
  ) 
  {}

  private toDto(entity: Notification): NotificationDto {
    return plainToInstance(NotificationDto, entity, { excludeExtraneousValues: true });
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<NotificationDto> {
    const { userId } = createNotificationDto;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newNotification = this.notificationRepository.create({
      ...createNotificationDto,
      user: { id: userId } as any,
    });

    const saved = await this.notificationRepository.save(newNotification);

    const withUser = await this.notificationRepository.findOne({
      where: { id: saved.id },
      relations: ['user'],
    });

    return this.toDto(withUser!);
  }


  async findAll(query: FindAllNotificationsQueryDto): Promise<AllNotifications> {
    const { limit = 10, offset = 0, title, channel, userId } = query;

    const where: any = {};
    if (title) where.title = title;
    if (channel) where.channel = channel;
    if (userId) where.user = { id:userId };

    const [rows, total] = await this.notificationRepository.findAndCount({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      data: rows.map((notification) => this.toDto(notification)),
      total,
      limit,
      offset,
    };
  }

  async findOne(id: string): Promise<NotificationDto> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) throw new NotFoundException(`Notification with ID ${id} not found`);

    return this.toDto(notification);
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<NotificationDto> {
    const entity = await this.notificationRepository.preload({
      id,
      ...updateNotificationDto,
    });
    if (!entity) throw new NotFoundException(`Notification with ID ${id} not found`);

    await this.notificationRepository.save(entity);
    return this.toDto(entity);
  }

  async remove(id: string): Promise<{ removed: true }> {
    const result = await this.notificationRepository.delete(id);
    if (!result.affected) throw new NotFoundException(`Notification with ID ${id} not found`);
    return { removed: true };
  }
}
