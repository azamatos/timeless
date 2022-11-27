import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class UpdateTaskList {
  @IsNumber()
  id: number;

  @IsString()
  @Length(3, 40)
  name: string;

  @IsBoolean()
  create: boolean;

  @IsBoolean()
  read: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  delete: boolean;
}
