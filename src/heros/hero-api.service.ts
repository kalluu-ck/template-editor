import { Injectable } from '@angular/core';
import { HeroModel } from './hero-interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroApiService {
  private _dbHeros: HeroModel[] = [
    {
      id: 1,
      name: 'Spider-man',
      rating: 3,
    },
    {
      id: 2,
      name: 'Daredevil',
      rating: 2,
    },
    {
      id: 3,
      name: 'Wonder Girl',
      rating: 4,
    },
    {
      id: 4,
      name: 'Batman',
      rating: 5,
    },
    {
      id: 5,
      name: 'Logan',
      rating: 1,
    },
  ];

  getAll(): Promise<HeroModel[]> {
    console.log('call api getAll');
    return new Promise<HeroModel[]>((resolve) => {
      setTimeout(() => {
        resolve(this._dbHeros);
      }, 500);
    });
  }

  findById(id: number): Promise<HeroModel | null> {
    console.log('call api findById = ', id);
    return new Promise<HeroModel | null>((resolve) => {
      setTimeout(() => {
        const hero = this._dbHeros.find((x) => x.id === id);
        console.log('FOUND HERO = ', hero);
        resolve(hero || null);
      }, 500);
    });
  }

  getByName(name: string): Promise<HeroModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this._dbHeros.filter((x) =>
            x.name.toLowerCase().includes(name.toLowerCase())
          )
        );
      }, 500);
    });
  }

  updateRecord(record: HeroModel): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this._dbHeros = this._dbHeros.map((x) =>
          x.id === record.id ? record : x
        );
        resolve();
      }, 500);
    });
  }

  deleteRecord(id: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this._dbHeros = this._dbHeros.filter((x) => x.id !== id);
        resolve();
      }, 500);
    });
  }
}
