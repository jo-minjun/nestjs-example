import { Injectable } from '@nestjs/common';
import { DummyApi, GetDelayStringRequest } from '../client';
import { stringify } from 'querystring';

@Injectable()
export class DelayService {
  private dummyApi: DummyApi;

  constructor() {
    this.dummyApi = new DummyApi();
  }

  async delayRequest(query: number): Promise<string> {
    const request: GetDelayStringRequest = { seconds: query };

    console.log(request);
    return this.dummyApi.getDelayString(request);
  }
}
