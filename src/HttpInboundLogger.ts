import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class HttpInboundLogger implements NestMiddleware {
  private logger: Logger = new Logger('HTTP Inbound');

  use(request: Request, response: Response, next: NextFunction) {
    const {method, originalUrl, body} = request;
    this.logger.log(`Request\n${method} ${originalUrl}\nHeaders: '${JSON.stringify(request.headers)}\nBody: ${JSON.stringify(body)}`
    );

    const {write, end} = response;
    const chunks = [];
    response.write = function (chunk: any) {
      chunks.push(chunk);
      return write.apply(response, arguments);
    };
    response.end = function (chunk: any) {
      if (chunk) {
        chunks.push(chunk);
      }
      return end.apply(response, arguments);
    };
    response.on('finish', () => {
      const {statusCode} = response;
      const responseBody = Buffer.concat(chunks).toString('utf-8');

      this.logger.log(`Response\nStatus: ${statusCode}\nBody: ${JSON.stringify(JSON.parse(responseBody), null, 2)}`
      )
    });

    next();
  }
}
