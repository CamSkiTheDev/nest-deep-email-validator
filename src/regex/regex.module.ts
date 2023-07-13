import { Module } from '@nestjs/common';
import { RegexService } from './regex.service';

@Module({
  providers: [RegexService],
  exports: [RegexService],
})
export class RegexModule {}
