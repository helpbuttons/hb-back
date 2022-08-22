import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ButtonService } from './button.service';
import { ButtonController } from './button.controller';
import { Button } from './button.entity';
import { TagModule } from '../tag/tag.module';
import { NetworkModule } from '../network/network.module';
import { StorageModule } from '../storage/storage.module';
import { TemplateButtonModule } from '../template-button/template-button.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Button]),
    TagModule,
    NetworkModule,
    StorageModule,
    TemplateButtonModule
  ],
  controllers: [
    ButtonController
  ],
  providers: [
    ButtonService
  ],
  exports: [
    ButtonService
  ]
})
export class ButtonModule {}
