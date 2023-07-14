import { Injectable } from '@nestjs/common';
import { SmtpService } from './smtp/smtp.service';
import { RegexService } from './regex/regex.service';
import { OutputService } from './output/output.service';
import { TypoService } from './typo/typo.service';
import { DisposableService } from './disposable/disposable.service';
import { DnsService } from './dns/dns.service';
import { ValidateEmailDto } from './dto/validate-email.dto';

type Options = {
  sender: string;
  validateRegex: boolean;
  validateMx: boolean;
  validateTypo: boolean;
  validateDisposable: boolean;
  validateSMTP: boolean;
};

export type ValidatorOptions = Partial<Options> & {
  email: string;
};
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

  async getHelo(emailOrOptions: string | ValidateEmailDto): Promise<any> {
    const defaultOptions: ValidatorOptions =
      typeof emailOrOptions === 'string'
        ? {
            email: (emailOrOptions ?? 'name@test.com').trim(),
            sender: 'name@test.com',
            validateRegex: true,
            validateMx: true,
            validateTypo: false,
            validateDisposable: true,
            validateSMTP: true,
          }
        : {
            email: (emailOrOptions.email ?? 'name@test.com').trim(),
            sender: 'name@test.com',
            validateRegex: emailOrOptions.validateRegex ?? true,
            validateMx: emailOrOptions.validateMx ?? true,
            validateTypo: emailOrOptions.validateTypo ?? false,
            validateDisposable: emailOrOptions.validateDisposable ?? true,
            validateSMTP: emailOrOptions.validateSMTP ?? true,
          };

    if (defaultOptions.validateRegex) {
      const regexResponse = this.regexService.validateEmail(
        defaultOptions.email,
      );
      if (regexResponse)
        return this.outputService.createOutput('regex', regexResponse);
    }

    if (defaultOptions.validateTypo) {
      const typoResponse = this.typoService.validateEmail(defaultOptions.email);
      if (typoResponse)
        return this.outputService.createOutput('typo', typoResponse);
    }

    const domain = defaultOptions.email.split('@')[1];

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
      const mx = await this.dnsService.validateMX(defaultOptions.email);

      if (!mx)
        return this.outputService.createOutput('mx', 'MX record not found');

      if (defaultOptions.validateSMTP)
        return await this.smtpService.checkSMTP(
          defaultOptions.sender,
          defaultOptions.email,
          mx.exchange,
        );
    }

    return this.outputService.createOutput();
  }
}
