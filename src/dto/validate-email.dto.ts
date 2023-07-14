export class ValidateEmailDto {
  email: string;
  validateRegex?: boolean;
  validateMx?: boolean;
  validateTypo?: boolean;
  validateDisposable?: boolean;
  validateSMTP?: boolean;
}
