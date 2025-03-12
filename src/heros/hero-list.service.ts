import { computed, Injectable, resource } from '@angular/core';
import { HeroApiService } from './hero-api.service';

@Injectable()
export class HeroListService {
  constructor(private heroApi: HeroApiService) {}

  heroes = computed(() => this.heroResource.value());

  private heroResource = resource({
    loader: () => this.heroApi.getAll(),
  });
}
