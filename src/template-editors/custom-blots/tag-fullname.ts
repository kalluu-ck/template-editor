import { CustomEmbed } from './custom-embed';

export interface FullNameConfigModel {
  field: string;
}

export class FullNameBlot extends CustomEmbed {
  static override blotName = 'fullname';
  static override tagName = 'app-fullname';
  static override dataMapping = {
    fullname$: 'name',
  };
  static override placeholderLabel = 'FullName';
}
