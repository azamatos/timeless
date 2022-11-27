import { IsString, Length } from 'class-validator';

export class UserData {
  @IsString()
  @Length(3, 20)
  login: string;

  @IsString()
  @Length(3, 40)
  password: string;
}
