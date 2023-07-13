import { Injectable } from '@nestjs/common';
import { ElementType } from 'src/types';

const OrderedLevels = ['regex', 'typo', 'disposable', 'mx', 'smtp'] as const;

export type SubOutputFormat = {
  valid: boolean;
  reason?: string;
};

type Level = ElementType<typeof OrderedLevels>;

export interface GeneralOutputFormat extends SubOutputFormat {
  reason?: Level;
}

export type OutputFormat = GeneralOutputFormat & {
  validators: {
    [K in Level]?: SubOutputFormat;
  };
};

@Injectable()
export class OutputService {
  createOutput(failLevel?: Level, failReason?: string): OutputFormat {
    const output: OutputFormat = { valid: true, validators: {} };

    if (failLevel) {
      output.reason = failLevel;
      output.valid = false;
    }

    let valid = true;

    for (let i = 0; i < OrderedLevels.length; i++) {
      const level = OrderedLevels[i];
      const levelOut: SubOutputFormat = { valid };

      if (level === failLevel) {
        valid = false;
        levelOut.valid = false;
        levelOut.reason = failReason;
      }

      output.validators[level] = levelOut;
    }
    return output;
  }
}
