import 'reflect-metadata';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

import { AppModule } from '@src/app/app.module';
import webAppConfig from './app/configs/web-app.config';
import * as bodyParser from 'body-parser';

// Middleware
import { HttpExceptionFilter } from './shared/middlewares/errors/global-http-exception-filter.middleware';
import { ValidationException, ValidationFilter } from './shared/middlewares/errors/validation-filter.middleware';

async function bootstrap() {
  /**
   * README: Calling initializeTransactionalContext and or patchTypeORMRepositoryWithBaseRepository must happen BEFORE any application context is initialized!
   */
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const webAppConfigs = app.get<ConfigType<typeof webAppConfig>>(
    webAppConfig.KEY,
  );

  app.enableCors({ origin: webAppConfigs.allowedCors });
  app.setGlobalPrefix(webAppConfigs.baseUrl);

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  
  // validation filters
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors: ValidationError[]) => {
      const errMsg = {};
      errors.forEach(err => {
        errMsg[err.property] = [...Object.values(err.constraints)];
      });
      return new ValidationException(errMsg);
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Helpbuttons backend')
    .setDescription('.')
    .setVersion('1.0')
    .addTag('hb')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(webAppConfigs.swaggerPath, app, document);

  await app.listen(webAppConfigs.port);
}
bootstrap();
