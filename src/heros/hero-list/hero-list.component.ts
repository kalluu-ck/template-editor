import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroListService } from '../hero-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  imports: [RouterLink],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroListService],
})
export class HeroListComponent {
  get heroes() {
    return this.listService.heroes();
  }

  constructor(public listService: HeroListService) {}
}
