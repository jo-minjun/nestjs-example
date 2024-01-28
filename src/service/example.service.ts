import { Injectable } from '@nestjs/common';
import { DummyApi } from '../client';

@Injectable()
export class ExampleService {
  private dummyApi: DummyApi;

  constructor() {
    this.dummyApi = new DummyApi();
  }

  async delayRequest(query: number): Promise<string> {
    const result = await this.dummyApi.getDelayString(query);
    if (!result || !result.status.toString().startsWith('2')) {
      throw new Error('요청에 실패했습니다');
    }

    return result.data;
  }
}
