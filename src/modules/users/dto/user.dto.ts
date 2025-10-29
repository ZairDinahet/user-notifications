import { Exclude, Expose } from "class-transformer"

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  password: string;
}