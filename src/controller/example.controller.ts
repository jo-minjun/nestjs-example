import {Controller, Get, Query} from '@nestjs/common';
import {ExampleService} from '../service/example.service';
import {ExampleResponse} from './ExampleResponse';
import {ConfigService} from "@nestjs/config";

@Controller('/api')
export class ExampleController {
  constructor(private readonly delayService: ExampleService, private readonly configService: ConfigService) {
  }

  @Get('/delay')
  async getDelayString(@Query('query') query: number): Promise<ExampleResponse> {
    const firstRequest: Promise<string> = this.delayService.delayRequest(query);
    const secondRequest: Promise<string> = this.delayService.delayRequest(this.configService.get<number>('DEFAULT_DELAY'));

    const [firstResponse, secondResponse] = await Promise.all([firstRequest, secondRequest]);

    return new ExampleResponse(firstResponse, secondResponse);
  }
}
