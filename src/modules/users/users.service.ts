import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/common/helpers/hash.helper';
import { FindUsersQueryDto } from './dto/find-users.query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private toDto(entity: User): UserDto {
    return plainToInstance(UserDto, entity, { excludeExtraneousValues: true });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, email, ...rest } = createUserDto;

    const exists = await this.userRepository.exists({ where: { email } });
    if (exists) throw new BadRequestException('Email already in use');

    const hashedPassword = await hashPassword(password);

    const newUser = this.userRepository.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    return this.toDto(newUser);
  }

  async findAll(
    query: FindUsersQueryDto,
  ): Promise<{
    data: UserDto[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const { limit, offset, email, role } = query;

    const where: any = {};
    if (email) where.email = email;
    if (role) where.role = role;

    const [rows, total] = await this.userRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      data: rows.map((user) => this.toDto(user)),
      total,
      limit,
      offset,
    };
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.toDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const entity = await this.userRepository.preload({ id, ...updateUserDto });

    if (!entity) throw new NotFoundException(`User with id ${id} not found`);

    const saved = await this.userRepository.save(entity);
    return this.toDto(saved);
  }

  async softDelete(id: string): Promise<{ softDeleted: true }> {
    const res = await this.userRepository.softDelete(id);
    if (!res.affected) throw new NotFoundException(`User with id ${id} not found`);
    return { softDeleted: true };
  }

  async hardDelete(id: string): Promise<{ deleted: true }> {
    const res = await this.userRepository.delete(id);
    if (!res.affected) throw new NotFoundException(`User with id ${id} not found`);
    return { deleted: true };
  }

  async restore(id: string): Promise<{ restored: true }> {
    const res = await this.userRepository.restore(id);
    if (!res.affected) throw new NotFoundException(`User with id ${id} not found`);
    return { restored: true };
  }
}
