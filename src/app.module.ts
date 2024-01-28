import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ExampleController} from './controller/example.controller';
import {ExampleService} from './service/example.service';
import {ConfigModule} from '@nestjs/config';
import {HttpInboundLogger} from "./HttpInboundLogger";
import * as path from "path";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true // 어떤 모듈에서든지 ConfigService inject 가능
  })],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(HttpInboundLogger)
    .exclude('/management')
    .forRoutes('*')
  }
}
