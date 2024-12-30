import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PeopleService } from './people/people.service';
import { IQueryDto } from '@eik/shared';

@Injectable()
export class AppService {

  constructor(readonly peopleService: PeopleService) {
    console.log('AppService constructor');
  }

  getData(query: IQueryDto) {
    return this.peopleService.getPeople(query)// { message: 'Hello API' };
  }
}
