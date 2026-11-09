import { Body, Controller, Get, Header, Headers, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { Counter, collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

const webhookCounter = new Counter({
  name: 'webhook_requests_total',
  help: 'Total webhook requests received',
  labelNames: ['result'],
});

@Controller()
export class AppController {
  @Get('healthz')
  health() {
    return { status: 'ok' };
  }

  @Post('webhook')
  @HttpCode(200)
  webhook(@Headers('x-webhook-secret') secret: string, @Body() body: unknown) {
    const expected = process.env.WEBHOOK_SECRET;
    if (expected && secret !== expected) {
      webhookCounter.inc({ result: 'rejected' });
      throw new UnauthorizedException();
    }
    webhookCounter.inc({ result: 'accepted' });
    return { status: 'received' };
  }

  @Get('metrics')
  @Header('Content-Type', register.contentType)
  metrics() {
    return register.metrics();
  }
}
