import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { OutputModule } from 'src/output/output.module';

@Module({
  imports: [OutputModule],
  providers: [SmtpService],
  exports: [SmtpService],
})
export class SmtpModule {}
