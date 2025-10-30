import { UserDto } from "../dto/user.dto";

export interface AllUsers{
  data: UserDto[];
  total: number;
  limit: number;
  offset: number;
}