import { Controller, Get, Query } from '@nestjs/common';
import { DelayService } from '../service/delay.service';

@Controller()
export class DelayController {
  constructor(private readonly delayService: DelayService) {}

  @Get('/delay')
  async getDelayString(@Query('query') query: number): Promise<string> {
    console.log(query)
    const firstRequest: Promise<string> = this.delayService.delayRequest(query)
    const secondRequest: Promise<string> = this.delayService.delayRequest(query);

    const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), 15000)
  );

    const [firstResponse, secondResponse] = await Promise.race([Promise.all([firstRequest, secondRequest]), timeoutPromise]);

    return firstResponse;
  }
}
