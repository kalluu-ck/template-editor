import { Injectable, signal } from '@angular/core';
import { HeroApiService } from './hero-api.service';
import { HeroModel } from './hero-interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeroDetailService {
  private _id = signal(-1);

  dataSubject = new BehaviorSubject<HeroModel | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private heroApi: HeroApiService) {}

  set id(id: number) {
    console.log('set heroId = ', id);
    this._id.set(id);
    this.heroApi.findById(id).then((data) => this.dataSubject.next(data));
  }

  // private dataResource = resource({
  //   request: this._id,
  //   loader: ({ request }) => this.heroApi.findById(request),
  // });

  // data = computed(() => this.dataResource.value());

  update(hero: HeroModel) {
    this.heroApi.updateRecord(hero).then(() => {
      this.dataSubject.next(hero);
      //this.dataResource.set(hero);
    });
  }
}
