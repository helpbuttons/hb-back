import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateButtonService } from './template-button.service';
import { TemplateButtonController } from './template-button.controller';
import { TemplateButton } from './template-button.entity';
import { NetworkModule } from '../network/network.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateButton]),
    NetworkModule
  ],
  controllers: [
    TemplateButtonController
  ],
  providers: [
    TemplateButtonService
  ],
  exports: [TemplateButtonService]
})
export class TemplateButtonModule {}
