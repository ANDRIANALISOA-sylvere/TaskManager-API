import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() data: EmailDto) {
    await this.emailService.sendEmail(data);
    return { message: 'Email sent successfully' };
  }
}
