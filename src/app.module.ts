import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmtpModule } from './smtp/smtp.module';
import { OutputModule } from './output/output.module';
import { RegexModule } from './regex/regex.module';
import { TypoModule } from './typo/typo.module';
import { DisposableModule } from './disposable/disposable.module';
import { DnsModule } from './dns/dns.module';

@Module({
  imports: [SmtpModule, OutputModule, RegexModule, TypoModule, DisposableModule, DnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
