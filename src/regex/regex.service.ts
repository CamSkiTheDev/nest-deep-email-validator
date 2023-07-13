import { Injectable } from '@nestjs/common';

@Injectable()
export class RegexService {
  validateEmail(email: string): string | undefined {
    email = (email || '').trim();

    if (email.length === 0) return 'No email address provided.';

    const split = email.split('@');
    if (split.length < 2) return 'Email does not contain "@".';

    const [domain] = split.slice(-1);
    if (domain.indexOf('.') === -1) return 'Must contain a "." after the "@".';

    return undefined;
  }
}
