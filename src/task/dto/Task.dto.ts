import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
enum Priority {
  FAIBLE = 'FAIBLE',
  MOYENNE = 'MOYENNE',
  ELEVE = 'ELEVE',
}
export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The title of the task',
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The description of the task',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsEnum(Priority)
  @ApiProperty({
    enum: Priority,
    description: 'The priority of the task',
    required: true,
  })
  priority: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'The deadline of the task',
    required: true,
  })
  deadline: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'The project of the task',
    required: true,
  })
  projectId: number;
}
