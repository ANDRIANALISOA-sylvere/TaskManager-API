import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
