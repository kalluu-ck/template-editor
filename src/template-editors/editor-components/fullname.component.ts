import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { PersonDataService } from '../person-data.service';

@Component({
  selector: 'app-fullname',
  template:
    '<span class="highlight"><strong>{{ fullname$()| titlecase}} (Partner: {{partnerFullname$() | titlecase}})</strong></span>',
  imports: [TitleCasePipe],
  providers: [PersonDataService],
})
export class FullNameComponent {
  id$ = input<number>(-1);
  fullname$ = computed(() => this.service.loadPerson(this.id$())?.name);
  partnerFullname$ = computed(() => {
    const partnerId = this.service.loadPerson(this.id$())?.partnerId;
    return this.service.loadPerson(partnerId ?? -1)?.name;
  });

  constructor(private service: PersonDataService) {}
}
