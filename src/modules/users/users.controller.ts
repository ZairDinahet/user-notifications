import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users.query.dto';
import { UserDto } from './dto/user.dto';
import { AllUsers } from './interfaces/all-users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() query: FindAllUsersQueryDto
  ): Promise<AllUsers> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ softDeleted: true }> {
    return this.usersService.softDelete(id);
  }

  @Delete(':id/hard')
  async hardDelete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ deleted: true }> {
    return this.usersService.hardDelete(id);
  }

  @Post(':id/restore')
  async restore(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ restored: true }> {
    return this.usersService.restore(id);
  }
}
