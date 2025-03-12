import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fullname',
  template:
    '<span class="highlight"><strong>{{fullname$() | titlecase}}</strong></span>',
  imports: [TitleCasePipe],
})
export class FullNameComponent {
  fullname$ = input<string>();
}
