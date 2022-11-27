import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class UpdateTask {
  @IsNumber()
  id: number;

  @IsString()
  @Length(3, 40)
  name: string;

  @IsBoolean()
  isCompleted?: boolean;
}
