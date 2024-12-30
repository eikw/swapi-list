import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodPipe } from './utils/zod-pipe';
import { IQueryDto, schema } from '@eik/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Query(new ZodPipe(schema)) query: IQueryDto) {
    return this.appService.getData(query);
  }
}
