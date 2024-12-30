import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

export interface IPlanet {
  climate: string;
  created: Date;
  diameter: number;
  edited: Date;
  films: string[];
  gravity: number;
  name: string;
  orbital_period: number;
  population: number;
  residents: string[];
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
}

export interface IPlanetCache {
  url: string;
  planet: IPlanet;
}

@Injectable()
export class PlanetService {
  baseUrl;
  endpoint = '/planets';
  cache: IPlanetCache[] = [];

  constructor(@Inject('BASE_URL') baseUrl: string) {
    console.log('PlanetsService constructor');
    this.baseUrl = baseUrl;
  }

  async getPlanetByUrl(url: string) {
    if (this.cache.length > 0) {
      const cached = this.cache.find((entry) => entry.url === url);
      if (cached) {
        return cached.planet;
      }
    }
    try {
      const result = await fetch(url);
      const json = await result.json();

      this.cache.push(
        {
          url,
          planet: json as IPlanet,
        }
      );
      return json;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPlanetById(id: number) {
    return this.getPlanetByUrl(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
