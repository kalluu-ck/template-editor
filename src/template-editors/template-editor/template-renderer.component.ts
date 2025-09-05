import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DynamicHooksComponent, ParseOptions } from 'ngx-dynamic-hooks';
import { DateComponent } from '../editor-components/date.component';
import { FullNameComponent } from '../editor-components/fullname.component';

@Component({
  selector: 'app-template-renderer',
  template: `<ngx-dynamic-hooks
    [content]="htmlString$()"
    [parsers]="parsers"
    [options]="options"
    [context]="data$()"
  ></ngx-dynamic-hooks>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicHooksComponent],
})
export class TemplateRendererComponent {
  htmlString$ = input<string>();
  data$ = input<unknown>();
  parsers = [DateComponent, FullNameComponent];
  options: ParseOptions = {
    sanitize: false,
  };
}
