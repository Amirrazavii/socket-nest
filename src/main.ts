import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  console.log(port);
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('uid')
  .setDescription('uid api documentation')
  .setVersion('1.0')
  .addTag('uid')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   //Add your origins here
  //   origin: '*'
  // });
  app.use(cookieParser());
  await app.listen(port);
  const logger = new Logger('Main')

  // log docs
  // const baseUrl = AppModule.getBaseUrl(app)
  // const url = `http://${baseUrl}:${AppModule.port}`
  logger.log(`API Documentation available at /docs`);
}

bootstrap();
