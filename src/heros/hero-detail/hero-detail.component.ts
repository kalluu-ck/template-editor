import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HeroDetailService } from '../hero-detail.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroDetailService],
})
export class HeroDetailComponent implements OnInit {
  private _id: number = -1;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    rating: new FormControl(0, Validators.required),
  });

  constructor(public detailService: HeroDetailService) {
    // effect(() => {
    //   const data = this.detailService.data();
    //   if (data) {
    //     this.form.setValue({
    //       name: data.name,
    //       rating: data.rating,
    //     });
    //   }
    // });
  }
  ngOnInit(): void {
    this.detailService.data$.subscribe((data) => {
      this.form.setValue({
        name: data?.name || '',
        rating: data?.rating || 0,
      });
    });
  }

  @Input()
  set id(value: string) {
    this._id = Number(value);
    this.detailService.id = this._id;
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.detailService.update({
      id: this._id,
      name: this.form.value.name!,
      rating: this.form.value.rating!,
    });
  }
}
