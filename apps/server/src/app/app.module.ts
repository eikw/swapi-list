import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleService } from './people/people.service';
import { PlanetService } from './planets/planet.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PeopleService,
    PlanetService,
    {
      provide: 'BASE_URL',
      useValue: 'https://swapi.py4e.com/api',
    },
  ],
})
export class AppModule {}
