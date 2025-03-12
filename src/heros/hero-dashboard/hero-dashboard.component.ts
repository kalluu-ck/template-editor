import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroListService } from '../hero-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-dashboard',
  imports: [RouterLink],
  templateUrl: './hero-dashboard.component.html',
  styleUrl: './hero-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroListService],
})
export class HeroDashboardComponent {
  get TopHeroes() {
    return this.listService
      .heroes()
      ?.slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  constructor(private listService: HeroListService) {}
}
