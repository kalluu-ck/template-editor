import { Injectable } from '@angular/core';

export interface PersonModel {
  id: number;
  name: string;
  birthdate: Date;
  partnerId?: number;
}

@Injectable()
export class PersonDataService {
  private _persons: PersonModel[] = [
    {
      id: 1,
      name: 'Jalan Alor',
      birthdate: new Date(2023, 4, 23),
      partnerId: 2,
    },
    {
      id: 2,
      name: 'Bukit Bintang',
      birthdate: new Date(2023, 4, 24),
      partnerId: 1,
    },
    {
      id: 3,
      name: 'Batu Cave',
      birthdate: new Date(2023, 4, 25),
    },
  ];

  loadPerson(id: number): PersonModel {
    return this._persons.find((x) => x.id === id)!;
  }
}
