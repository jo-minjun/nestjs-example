import { Injectable } from '@nestjs/common';
import { DummyApi, GetDelayStringRequest } from '../client';

@Injectable()
export class ExampleService {
  private dummyApi: DummyApi;

  constructor() {
    this.dummyApi = new DummyApi();
  }

  async delayRequest(query: number): Promise<string> {
    const request: GetDelayStringRequest = { seconds: query };

    return this.dummyApi.getDelayString(request);
  }
}
