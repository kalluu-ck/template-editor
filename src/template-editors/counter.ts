import 'quill';
import Quill from 'quill';

export interface Config {
  container: string;
  unit: 'word' | 'char';
}

export interface QuillInstance {
  on: any;
  getText: any;
}

export default class Counter {
  constructor(public quill: Quill, public options: Config) {
    const container = document.querySelector(this.options.container)!;
    this.quill.on('editor-change', () => {
      const length = this.calculate();
      container.innerHTML = length + ' ' + this.options.unit + 's';
    });
  }

  calculate() {
    const text = this.quill.getText().trim();
    if (this.options.unit === 'word') {
      return text?.split(/\s+/).length ?? 0;
    }
    return text?.length ?? 0;
  }
}
