import { Injectable } from '@nestjs/common';
import * as domains from 'disposable-email-domains';
const disposableDomains: Set<string> = new Set(domains);

@Injectable()
export class DisposableService {
  disposableDomainValidation(domain: string): string | undefined {
    if (disposableDomains.has(domain))
      return 'Email was created using a disposable email service.';

    return undefined;
  }
}
