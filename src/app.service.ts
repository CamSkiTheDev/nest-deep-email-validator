import { Injectable } from '@nestjs/common';
import { SmtpService } from './smtp/smtp.service';
import { RegexService } from './regex/regex.service';
import { OutputService } from './output/output.service';
import { TypoService } from './typo/typo.service';
import { DisposableService } from './disposable/disposable.service';
import { DnsService } from './dns/dns.service';

@Injectable()
export class AppService {
  constructor(
    private smtpService: SmtpService,
    private regexService: RegexService,
    private outputService: OutputService,
    private typoService: TypoService,
    private disposableService: DisposableService,
    private dnsService: DnsService,
  ) {}

  async getHello(): Promise<any> {
    const defaultOptions = {
      email: 'cameronlucasaim@gmail.com',
      sender: 'name@example.org',
      validateRegex: true,
      validateMx: true,
      validateTypo: false,
      validateDisposable: true,
      validateSMTP: true,
    };

    const email = defaultOptions.email;

    if (defaultOptions.validateRegex) {
      const regexResponse = this.regexService.validateEmail(email);
      if (regexResponse)
        return this.outputService.createOutput('regex', regexResponse);
    }

    if (defaultOptions.validateTypo) {
      const typoResponse = this.typoService.validateEmail(email);
      if (typoResponse)
        return this.outputService.createOutput('typo', typoResponse);
    }

    const domain = email.split('@')[1];

    if (defaultOptions.validateDisposable) {
      const disposableResponse =
        this.disposableService.disposableDomainValidation(domain);
      if (disposableResponse)
        return this.outputService.createOutput(
          'disposable',
          disposableResponse,
        );
    }

    if (defaultOptions.validateMx) {
      const mx = await this.dnsService.validateMX(email);

      if (!mx)
        return this.outputService.createOutput('mx', 'MX record not found');
      if (defaultOptions.validateSMTP) {
        return await this.smtpService.checkSMTP(
          defaultOptions.sender,
          email,
          mx.exchange,
        );
      }
    }

    return this.outputService.createOutput();
  }
}
