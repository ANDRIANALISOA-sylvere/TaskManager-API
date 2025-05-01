import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'src/enum/Status.enum';

export class UpdateStatusDto {
  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;
}
