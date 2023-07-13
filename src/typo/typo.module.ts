import { Module } from '@nestjs/common';
import { TypoService } from './typo.service';

@Module({
  providers: [TypoService],
  exports: [TypoService],
})
export class TypoModule {}
