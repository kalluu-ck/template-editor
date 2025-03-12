import { CustomEmbed } from './custom-embed';

export interface DateConfig {
  format?: string;
}

export class DateBlot extends CustomEmbed {
  static override blotName = 'date';
  static override tagName = 'app-date';
  static override dataMapping = {
    date$: 'birthdate',
  };
  static override placeholderLabel = 'Date';
}
