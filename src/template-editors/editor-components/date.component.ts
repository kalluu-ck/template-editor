import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-date',
  template: '<label><strong>{{date$() | date:"fullDate"}}</strong></label>',
  imports: [DatePipe],
})
export class DateComponent {
  date$ = input<Date>();
}
