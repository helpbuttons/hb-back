import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dbIdGenerator } from '@src/shared/helpers/nanoid-generator.helper';
import { Repository } from 'typeorm';
import { NetworkService } from '../network/network.service';
import {
  CreateTemplateButtonDto,
  UpdateTemplateButtonDto,
} from './template-button.dto';
import { TemplateButton } from './template-button.entity';

@Injectable()
export class TemplateButtonService {
  constructor(
    @InjectRepository(TemplateButton)
    private readonly templateButtonRepository: Repository<TemplateButton>,
    private readonly networkService: NetworkService,
  ) {}

  async create(createDto: CreateTemplateButtonDto) {
    let templateButton = {
      id: dbIdGenerator(),
      name: createDto.name,
      description: createDto.description,
      formFields: createDto.formFields,
    };

    await this.templateButtonRepository.insert([templateButton]);

    return templateButton;
  }

  async find(networkId: string) {
    const network = await this.networkService.findOne(networkId);

    return this.templateButtonRepository.find({
      where: { network: { id: networkId } },
    });
  }

  findOne(slug: string) {
    return this.templateButtonRepository.findOne({ slug });
  }

  update(slug: string, updateDto: UpdateTemplateButtonDto) {
    let templateButton = {
      ...updateDto,
      slug,
    };

    return this.templateButtonRepository.save([templateButton]);
  }

  remove(slug: string) {
    return this.templateButtonRepository.delete({ slug });
  }
}
