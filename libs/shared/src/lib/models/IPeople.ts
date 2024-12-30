import { IPlanet } from './IPlanet';

export interface IPeople {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: number;
  homeworld: IPlanet;
  mass: number;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}
