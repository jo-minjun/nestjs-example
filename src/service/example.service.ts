import {Injectable, Logger} from '@nestjs/common';
import { DummyApi } from '../client';
import axios from 'axios';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ExampleService {
  private dummyApi: DummyApi;

  constructor(private readonly configService: ConfigService) {
    this.dummyApi = new DummyApi(undefined, configService.get<string>('BASE_PATH'), axios);
  }

  async delayRequest(query: number): Promise<string> {
    const result = await this.dummyApi.getDelayString(query);

    return result.data;
  }
}

axios.interceptors.request.use(request => {
  const {method, url, headers, data} = request;
  Logger.log(`Request\n${method} ${url}\nHeaders: '${JSON.stringify(request.headers)}\nBody: ${JSON.stringify(data, null, 2)}`);

  return request
})

axios.interceptors.response.use(response => {
  const {status, data} = response;
  if (!response || !response.status.toString().startsWith('2')) {
    throw new Error('요청에 실패했습니다');
  }

  Logger.log(`Response\nStatus: ${status}\nBody: ${JSON.stringify(data, null, 2)}`);

  return response
})
