import { Body, Controller, Put, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck() {
    return { ok: true, date: Date().toString() };
  }

  @Put()
  getHello(@Body() body: ValidateEmailDto): any {
    return this.appService.getHelo(body);
  }
}
