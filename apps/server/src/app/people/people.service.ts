import { IQueryDto, IResponseDto } from '@eik/shared';
import {
  Body,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPlanet, PlanetService } from '../planets/planet.service';
import { IPeople } from '@eik/shared';

export interface cachedResult {
  query: IQueryDto;
  total: number;
  pageCount: number;
  next: boolean;
  previous: boolean;
  results: IPeople[];
}

@Injectable()
export class PeopleService {
  baseUrl;
  endpoint = '/people';
  cache: cachedResult[] = [];

  constructor(@Inject('BASE_URL') baseUrl: string, readonly planetService: PlanetService) {
    console.log('PeopleService constructor');
    this.baseUrl = baseUrl;
  }

  async getPeople(@Body() query: IQueryDto): Promise<IResponseDto> {
    if (this.cache.length > 0) {
      const cached = this.cache.find(
        (entry) =>
          entry.query.page === query.page && entry.query.value === query.value
      );
      if (cached) {
        console.log('cache hit');
        return cached as IResponseDto;
      }
    }

    const url = new URL(`${this.baseUrl}${this.endpoint}/`);
    try {
      if (query.value) url.searchParams.append('search', query.value.toLowerCase());
      if (query.page) url.searchParams.append('page', query.page.toString());
      const result = await fetch(url);
      const json = await result.json();

      for await (const person of json.results) {
        person.homeworld = await this.planetService.getPlanetByUrl(person.homeworld);
      }

      const cacheObject: cachedResult = {
        query,
        total: json.count,
        previous: json.previous ? true : false,
        next: json.next ? true : false,
        pageCount: Math.ceil(json.count / 10),
        results: json.results,
      };
      this.cache.push(cacheObject);
      console.log('cache miss');
      return cacheObject;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPerson(id: number) {
    const url = new URL(`${this.baseUrl}${this.endpoint}/${id}`);
    try {
      const result = await fetch(url);
      const json = await result.json();

      return json.result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
