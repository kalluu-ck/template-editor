import Embed from 'quill/blots/embed';

export abstract class CustomEmbed extends Embed {
  static dataMapping: Record<string, string> = {};
  static placeholderLabel: string = '';

  static override create(rawValue?: unknown): Node {
    const element = super.create() as Element;
    const attributes = Object.keys(this.dataMapping)
      .map((k) => `[${k}]='context.${this.dataMapping[k]}'`)
      .join(' ');
    const placeholder = `<span class='custom-blot'>[${this.placeholderLabel}]</span>`;
    element.innerHTML = `<${this.tagName} ${attributes}>${placeholder}</${this.tagName}>`;

    return element.firstChild!;
  }
}
