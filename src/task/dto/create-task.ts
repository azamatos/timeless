import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class CreateTask {
  @IsString()
  @Length(3, 40)
  name: string;

  @IsNumber()
  taskListId: number;

  @IsBoolean()
  isCompleted?: boolean;
}
