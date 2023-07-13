import { Injectable } from '@nestjs/common';
import emailSpellChecker from '@zootools/email-spell-checker';
import { MailSuggestion } from '@zootools/email-spell-checker/dist/lib/types';

@Injectable()
export class TypoService {
  validateEmail(email: string): string | undefined {
    email = (email || '').trim();

    const typos: MailSuggestion = emailSpellChecker.run({
      email,
    });

    if (typos) return typos.full;

    return undefined;
  }
}
